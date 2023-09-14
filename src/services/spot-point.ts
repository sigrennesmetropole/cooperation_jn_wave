import spotIcon from '../assets/icons/spot.png'
import { Icon, Style } from 'ol/style'
import type { RennesApp } from './RennesApp'
import type { GeoJSONLayer } from '@vcmap/core'

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
  if (spotPointStyle()) {
    spotPointLayer.setStyle(spotPointStyle())
  }
}
