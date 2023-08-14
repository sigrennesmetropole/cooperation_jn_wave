import type { GeoJSONLayer } from '@vcmap/core'
import type { RennesApp } from './RennesApp'
import { RENNES_LAYER } from '@/stores/layers'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { getUnselectedPointStyle } from '../../src/style/common'
import { apiExemService } from '@/services/api-exem'

export async function displayRealTimePoints(rennesApp: RennesApp) {
  const data = await apiExemService.getSitesMeasurement()
  const customLayer: GeoJSONLayer = await rennesApp.getLayerByKey(
    RENNES_LAYER.customLayerContinuousMeasurement
  )
  data.forEach((item: { geolocation: any }) => {
    const geolocation = item.geolocation
    if (geolocation && geolocation.length === 2) {
      const [latitude, longitude] = geolocation
      const point = new Point([longitude, latitude])
      const new_feature = new Feature(item)
      new_feature.setGeometry(point)
      new_feature.setStyle(getUnselectedPointStyle)
      customLayer.addFeatures([new_feature])
    }
  })
}
