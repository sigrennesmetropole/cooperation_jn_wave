<script setup lang="ts">
import { onMounted, inject } from 'vue'
import type { RennesApp } from '@/services/RennesApp'
import UiMap from '@/components/ui/UiMap.vue'
import { RENNES_LAYERNAMES, useLayersStore } from '@/stores/layers'
import type { Layer } from '@vcmap/core'
import NavigationButtons from '@/components/map/buttons/NavigationButtons.vue'
import PointFilterComponent from '@/components/map/PointFilterComponent.vue'
import { applySpotPointStyle } from '@/services/spot-point'
import { tiltViewpoint, untiltViewpoint } from '@/services/viewPointHelper'
import { applyEmitterSitesPointStyle } from '@/services/emitter-sites'

import { useMapStore, useMapViewPointStore } from '@/stores/map'
import { useViewsStore } from '@/stores/views'
import { EventType } from '@vcmap/core'
import mapClickAndMoveInteraction from '@/interactions/clickAndMoveInteraction'
import { getUnselectedPointStyle } from '@/style/common'

const rennesApp = inject('rennesApp') as RennesApp
const layerStore = useLayersStore()
const mapStore = useMapStore()
const viewStore = useViewsStore()
const mapViewPointStore = useMapViewPointStore()

onMounted(async () => {
  await rennesApp.initializeMap()
  rennesApp.activateMeasurementTool()
  await updateActiveMap()
  await updateLayersVisibility()
  // force initialization of the interaction on init page
  rennesApp.maps.eventHandler.addPersistentInteraction(
    new mapClickAndMoveInteraction(rennesApp)
  )
  rennesApp.maps.eventHandler.featureInteraction.setActive(EventType.CLICKMOVE)
})

async function updateActiveMap() {
  const oldViewpoint = await rennesApp.maps.activeMap.getViewpoint()

  await rennesApp.maps.setActiveMap(mapStore.activeMap)

  let newViewpoint
  if (mapStore.is3D()) {
    newViewpoint = tiltViewpoint(oldViewpoint!)
  } else {
    newViewpoint = untiltViewpoint(oldViewpoint!)
  }
  await rennesApp.maps.activeMap.gotoViewpoint(newViewpoint)
}

async function updateLayersVisibility() {
  for (const layer of RENNES_LAYERNAMES) {
    await setLayerVisible(layer, layerStore.visibilities[layer])
  }
}

async function setLayerVisible(layerName: string, visible: boolean) {
  const layer: Layer = rennesApp.maps.layerCollection.getByKey(layerName)
  if (visible) {
    await layer?.activate()
    await rennesApp.setLayerStyle(layerName, getUnselectedPointStyle)
  } else {
    layer?.deactivate()
  }
}

async function updateViewPoint(viewPoint: string) {
  const activeMap = rennesApp.maps.activeMap
  let selectedViewPoint = rennesApp.viewpoints.getByKey(viewPoint)

  if (selectedViewPoint) {
    if (mapStore.is3D()) {
      selectedViewPoint = tiltViewpoint(selectedViewPoint!)
    }
    await activeMap.gotoViewpoint(selectedViewPoint)
  } else {
    // go to home
    let homeViewPoint = rennesApp.viewpoints.getByKey('rennes')
    if (mapStore.is3D()) {
      homeViewPoint = tiltViewpoint(homeViewPoint!)
    }
    await activeMap.gotoViewpoint(homeViewPoint!)
  }
}

layerStore.$subscribe(async () => {
  await updateLayersVisibility()
})

mapStore.$subscribe(async () => {
  await updateActiveMap()
  if (rennesApp.maps.activeMap.name !== mapStore.activeMap) {
    await rennesApp.maps.setActiveMap(mapStore.activeMap)
  }
  if (viewStore.currentView === 'home') {
    await applySpotPointStyle(rennesApp)
    await applyEmitterSitesPointStyle(rennesApp)
  }
  if (
    mapStore.viewPoint !== null &&
    rennesApp.maps.activeMap.getViewpointSync() !== mapStore.viewPoint!
  ) {
    if (mapStore.isInitializeMap) {
      await rennesApp.maps.activeMap.gotoViewpoint(mapStore.viewPoint!)
    }
  }
})

mapViewPointStore.$subscribe(async () => {
  await updateViewPoint(mapViewPointStore.viewPoint)
})
</script>

<template>
  <UiMap></UiMap>
  <PointFilterComponent></PointFilterComponent>
  <NavigationButtons />
</template>
