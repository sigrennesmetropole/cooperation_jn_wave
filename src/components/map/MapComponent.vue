<script setup lang="ts">
import { onMounted, inject } from 'vue'
import type { RennesApp } from '@/services/RennesApp'
import UiMap from '@/components/ui/UiMap.vue'
import { RENNES_LAYERNAMES, useLayersStore } from '@/stores/layers'
import { updateInteractionsStoreAfterViewChange } from '@/services/interactionUtils'
import type { Layer } from '@vcmap/core'
import NavigationButtons from '@/components/map/buttons/NavigationButtons.vue'

import { useMapStore } from '@/stores/map'
import { useViewsStore } from '@/stores/views'

const rennesApp = inject('rennesApp') as RennesApp
const layerStore = useLayersStore()
const mapStore = useMapStore()
const viewStore = useViewsStore()

onMounted(async () => {
  await rennesApp.initializeMap()
  await updateActiveMap()
  await updateLayersVisibility()
  // force initialization of the interaction on init page
  updateInteractionsStoreAfterViewChange()
})

async function updateActiveMap() {
  await mapStore.activate2d()
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
  } else {
    layer?.deactivate()
  }
}

layerStore.$subscribe(async () => {
  await updateLayersVisibility()
})

viewStore.$subscribe(async () => {
  // triger mandatory store change after changing view
  updateInteractionsStoreAfterViewChange()
})

mapStore.$subscribe(async () => {
  if (rennesApp.maps.activeMap.name !== mapStore.activeMap) {
    await rennesApp.maps.setActiveMap(mapStore.activeMap)
  }
  if (rennesApp.maps.activeMap.getViewpointSync() !== mapStore.viewPoint!) {
    if (mapStore.isInitializeMap) {
      await rennesApp.maps.activeMap.gotoViewpoint(mapStore.viewPoint!)
    }
  }
  if (viewStore.currentView === 'home') {
    // await applyInstallationStyle(rennesApp)
  }
})
</script>

<template>
  <UiMap></UiMap>
  <NavigationButtons />
</template>
