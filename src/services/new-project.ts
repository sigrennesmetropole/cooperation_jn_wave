import newIcon from '../assets/icons/new.png'
import type { GeoJSONLayer } from '@vcmap/core'
import { Icon, Style } from 'ol/style'
import type { RennesApp } from './RennesApp'

export function newPointStyle() {
  return new Style({
    image: new Icon({
      opacity: 1,
      src: newIcon,
      scale: 1,
    }),
  })
}

export async function applyNewPointStyle(rennesApp: RennesApp) {
  const newPointLayer: GeoJSONLayer = await rennesApp.getLayerByKey(
    'customLayerNewProject'
  )
  if (newPointStyle()) {
    newPointLayer.setStyle(newPointStyle())
  }
}
