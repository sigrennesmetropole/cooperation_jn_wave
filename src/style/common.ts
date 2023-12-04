// @ts-nocheck

import { Icon, Style } from 'ol/style'
import continuousIcon from '@/assets/icons/continuous.png'
import spotIcon from '@/assets/icons/spot.png'
import emitterIcon from '@/assets/icons/emitter.svg'
import { vcsLayerName } from '@vcmap/core'
import { RENNES_LAYER } from '@/stores/layers'

const layerIconMapping: { [x: string]: string } = {
  [RENNES_LAYER.customLayerContinuousMeasurement]: continuousIcon,
  [RENNES_LAYER.customLayerSpotData]: spotIcon,
  [RENNES_LAYER.customLayerEmitterSites]: emitterIcon,
}

function getIconFromLayerName(layerName) {
  return layerIconMapping[layerName]
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
