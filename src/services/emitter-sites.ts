import emitterIcon from '../assets/icons/emitter.png'
import type { GeoJSONLayer } from '@vcmap/core'
import { Icon, Style } from 'ol/style'
import type { RennesApp } from './RennesApp'

export function emitterSitesPointStyle() {
  return new Style({
    image: new Icon({
      opacity: 1,
      src: emitterIcon,
      scale: 1,
    }),
  })
}

export async function applyEmitterSitesPointStyle(rennesApp: RennesApp) {
  const emitterSitesPointLayer: GeoJSONLayer = await rennesApp.getLayerByKey(
    'customLayerEmitterSites'
  )
  if (emitterSitesPointStyle()) {
    emitterSitesPointLayer.setStyle(emitterSitesPointStyle())
  }
}
