<script setup lang="ts">
import FooterAreaLink from '@/components/home/FooterAreaLink.vue'
import UiWavesPanelTitle from '@/components/ui/UiWavesPanelTitle.vue'
import InformationsWavesExposure from '@/components/home/InformationsWavesExposure.vue'
import MesurementsRequest from '@/components/ui/MesurementsRequest.vue'
import { inject, onMounted } from 'vue'
import { usePanelsStore } from '@/stores/panels'
import { useViewsStore } from '@/stores/views'
import { viewList } from '@/model/views.model'
import { usePointsStore } from '@/stores/points'
import { getUnselectedPointStyle } from '../../src/style/common'
import { RENNES_LAYER } from '@/stores/layers'

import type { RennesApp } from '@/services/RennesApp'
import type { GeoJSONLayer } from '@vcmap/core'
const rennesApp = inject('rennesApp') as RennesApp

const panelsStore = usePanelsStore()
const viewStore = useViewsStore()
const pointStore = usePointsStore()

function resetLayerStyle(layer: string) {
  const pointsLayer = rennesApp.layers.getByKey(layer) as GeoJSONLayer

  pointsLayer?.getFeatures().forEach((f) => {
    f.setStyle(getUnselectedPointStyle)
  })
}

onMounted(() => {
  viewStore.setCurrentView(viewList['home'])
  panelsStore.setTypePanelDisplay('left')
  panelsStore.isCompletelyHidden = false
  pointStore.resetPoint()

  resetLayerStyle(RENNES_LAYER.customLayerContinuousMeasurement)
  resetLayerStyle(RENNES_LAYER.customLayerSpotData)
  resetLayerStyle(RENNES_LAYER.customLayerEmitterSites)
  resetLayerStyle(RENNES_LAYER.customLayerNewProject)
})
</script>

<template>
  <UiWavesPanelTitle></UiWavesPanelTitle>
  <InformationsWavesExposure></InformationsWavesExposure>
  <MesurementsRequest></MesurementsRequest>
  <FooterAreaLink></FooterAreaLink>
</template>
