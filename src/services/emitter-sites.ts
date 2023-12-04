import emitterIcon from '@/assets/icons/emitter.svg'
import type { GeoJSONLayer } from '@vcmap/core'
import { Icon, Style } from 'ol/style'
import type { RennesApp } from '@/services/RennesApp'

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
