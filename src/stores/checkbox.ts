import { ref } from 'vue'
import { defineStore } from 'pinia'
import { RENNES_LAYER, useLayersStore } from '@/stores/layers'

export const useCheckboxStore = defineStore('checkbox', () => {
  const selectedPointRealTime = ref<boolean>(true)
  const selectedPointSpotData = ref<boolean>(true)
  const selectedPointEmitterSites = ref<boolean>(true)
  const selectedPointNewProjects = ref<boolean>(true)
  const layerStore = useLayersStore()

  function toggleRealTimePoint() {
    selectedPointRealTime.value = !selectedPointRealTime.value
    if (selectedPointRealTime.value == true) {
      layerStore.enableLayer(RENNES_LAYER.customLayerContinuousMeasurement)
    } else {
      layerStore.disableLayer(RENNES_LAYER.customLayerContinuousMeasurement)
    }
  }

  function toggleSpotDataPoint() {
    selectedPointSpotData.value = !selectedPointSpotData.value
    if (selectedPointSpotData.value == true) {
      // layerStore.enableLayer(RENNES_LAYER.customLayerSpotData)
    } else {
      // layerStore.disableLayer(RENNES_LAYER.customLayerSpotData)
    }
  }

  function toggleEmitterSitesPoint() {
    selectedPointEmitterSites.value = !selectedPointEmitterSites.value
    if (selectedPointEmitterSites.value == true) {
      // layerStore.enableLayer(RENNES_LAYER.customLayerEmitterSites)
    } else {
      // layerStore.disableLayer(RENNES_LAYER.customLayerEmitterSites)
    }
  }

  function toggleNewProjectPoint() {
    selectedPointNewProjects.value = !selectedPointNewProjects.value
    if (selectedPointNewProjects.value == true) {
      // layerStore.enableLayer(RENNES_LAYER.customLayerNewProjects)
    } else {
      // layerStore.disableLayer(RENNES_LAYER.customLayerNewprojects)
    }
  }

  return {
    selectedPointRealTime,
    selectedPointSpotData,
    selectedPointEmitterSites,
    selectedPointNewProjects,
    toggleRealTimePoint,
    toggleSpotDataPoint,
    toggleEmitterSitesPoint,
    toggleNewProjectPoint,
  }
})
