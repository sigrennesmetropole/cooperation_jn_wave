import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const RENNES_LAYER = {
  rennesOrtho: 'rennesOrtho',
  rennesBase: 'rennesBase',
  customLayerSearchAddress: 'customLayerSearchAddress',
  building: 'building',
  customLayerContinuousMeasurement: 'customLayerContinuousMeasurement',
  customLayerSpotData: 'customLayerSpotData',
  customLayerEmitterSites: 'customLayerEmitterSites',
}

export const RENNES_LAYERNAMES = [
  RENNES_LAYER.rennesOrtho,
  RENNES_LAYER.rennesBase,
  RENNES_LAYER.customLayerSearchAddress,
  RENNES_LAYER.building,
  RENNES_LAYER.customLayerContinuousMeasurement,
  RENNES_LAYER.customLayerSpotData,
  RENNES_LAYER.customLayerEmitterSites,
] as const

export type RennesLayer = (typeof RENNES_LAYERNAMES)[number]
export type LayersVisibility = Record<RennesLayer, boolean>

export const useLayersStore = defineStore('layers', () => {
  const visibilities: Ref<LayersVisibility> = ref({
    rennesOrtho: false,
    rennesBase: true,
    building: true,
    customLayerSearchAddress: true,
    customLayerContinuousMeasurement: true,
    customLayerSpotData: true,
    customLayerEmitterSites: true,
  })

  function enableLayer(name: RennesLayer) {
    visibilities.value = {
      ...visibilities.value,
      [name]: true,
    }
  }

  function disableLayer(name: RennesLayer) {
    visibilities.value = {
      ...visibilities.value,
      [name]: false,
    }
  }

  function isLayerVisible(name: RennesLayer) {
    return visibilities.value[name]
  }

  function update3DBaseLayer(is3D: boolean) {
    visibilities.value.rennesBase = !is3D
    visibilities.value.rennesOrtho = is3D
  }

  function setLayerVisibility(
    is3D: boolean,
    name: RennesLayer,
    visibility: boolean
  ) {
    update3DBaseLayer(is3D)
    visibilities.value = {
      ...visibilities.value,
      [name]: visibility,
    }
  }

  return {
    visibilities,
    enableLayer,
    disableLayer,
    update3DBaseLayer,
    setLayerVisibility,
    isLayerVisible,
  }
})
