import spotIcon from '../assets/icons/spot.png'
import type { GeoJSONLayer } from '@vcmap/core'
import { Icon, Style } from 'ol/style'
import type { RennesApp } from './RennesApp'

export function spotPointStyle() {
  return new Style({
    image: new Icon({
      opacity: 1,
      src: spotIcon,
      scale: 1,
    }),
  })
}

export async function applySpotPointStyle(rennesApp: RennesApp) {
  const spotPointLayer: GeoJSONLayer = await rennesApp.getLayerByKey(
    'customLayerSpotData'
  )
  if (spotPointLayer) {
    spotPointLayer.clearStyle()
    if (spotPointStyle()) {
      spotPointLayer.setStyle(spotPointStyle())
    }
  }
}
