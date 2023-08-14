// @ts-nocheck

import { Icon, Style } from 'ol/style'
import continuousIcon from '../assets/icons/continuous.png'
import spotIcon from '../assets/icons/spot.png'
import { vcsLayerName } from '@vcmap/core'
import { RENNES_LAYER } from '@/stores/layers'

function getIconFromLayerName(layerName) {
  if (layerName === RENNES_LAYER.customLayerContinuousMeasurement) {
    return continuousIcon
  } else if (layerName === RENNES_LAYER.customLayerSpotData) {
    return spotIcon
  }
}

export function getUnselectedPointStyle(feature) {
  return new Style({
    image: new Icon({
      opacity: 1,
      src: getIconFromLayerName(feature[vcsLayerName]),
      scale: 1,
    }),
  })
}

export function getSelectedPointStyle(feature) {
  return new Style({
    image: new Icon({
      opacity: 1,
      src: getIconFromLayerName(feature[vcsLayerName]),
      scale: 1.3,
    }),
  })
}
