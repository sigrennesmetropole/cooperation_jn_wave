import {
  AbstractInteraction,
  EventType,
  ModificationKeyType,
  PointerKeyType,
  GeoJSONLayer,
  type InteractionEvent,
} from '@vcmap/core'
import type { RennesApp } from '@/services/RennesApp'
import { RENNES_LAYER } from '@/stores/layers'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Style } from 'ol/style'
import { apiExemService } from '@/services/api-exem'

class mapClickAndMoveInteraction extends AbstractInteraction {
  private _rennesApp: RennesApp

  constructor(rennesApp: RennesApp) {
    super(EventType.CLICKMOVE, ModificationKeyType.NONE, PointerKeyType.ALL)
    this._rennesApp = rennesApp
  }

  async displayAllContinuousMeasurement() {
    const customLayer: GeoJSONLayer = await this._rennesApp.getLayerByKey(
      RENNES_LAYER.customLayerContinuousMeasurement
    )

    const data = await apiExemService.getSitesMeasurement()
    console.log('data api', data)
    data.forEach((item: { geolocation: any }) => {
      const geolocation = item.geolocation
      if (geolocation && geolocation.length === 2) {
        const [latitude, longitude] = geolocation
        const point = new Point([longitude, latitude])

        const new_feature = new Feature({
          geometry: point.transform('EPSG:4326', 'EPSG:3857'),
        })
        console.log(new_feature)
        new_feature.setStyle(new Style({}))
        customLayer.addFeatures([new_feature])
      }
    })
    console.log('toto')
  }

  async pipe(event: InteractionEvent): Promise<InteractionEvent> {
    //   const isFeatureTrambusStpos =
    //     event.feature?.[vcsLayerName] === RENNES_LAYER.trambusStops
    //   const isFeatureLine =
    //     event.feature?.[vcsLayerName] === RENNES_LAYER.trambusLines
    //   const isFeaturePOI = event.feature?.[vcsLayerName] === RENNES_LAYER.poi
    //   const isFeatureMetro = event.feature?.[vcsLayerName] === RENNES_LAYER.metro
    //   const isFeatureBus = event.feature?.[vcsLayerName] === RENNES_LAYER.bus
    //   const isFeatureBike = event.feature?.[vcsLayerName] === RENNES_LAYER.bike

    //   if (isFeatureTrambusStpos) {
    //     this._interactionStation(event)
    //   } else if (isFeatureLine) {
    //     await this._interactionLine(event)
    //   } else if (isFeaturePOI) {
    //     this._interactionPoi(event)
    //   } else if (isFeatureMetro) {
    //     await this._interactionMetro(event)
    //   } else if (isFeatureBus) {
    //     await this._interactionBus(event)
    //   } else if (isFeatureBike) {
    //     console.log(`isFeatureBike`)
    //     await this._interactionBike(event)
    //   } else {
    //     const stationsStore = useStationsStore()
    //     if (stationsStore.flagClearStationsExceptPermanently) {
    //       stationsStore.clearStationsExceptPermanently()
    //       stationsStore.flagClearStationsExceptPermanently = false
    //     }

    //     const viewStore = useViewsStore()
    //     if ([viewList.home, viewList.line].includes(viewStore.currentView)) {
    //       const poiInteractionStore = usePoiInteractionStore()
    //       if (poiInteractionStore.currentFeaturePoi) {
    //         undisplayCurrentPoi()
    //       }
    //     }

    //     document.body.style.cursor = 'auto'
    //   }
    return event
  }
}

export default mapClickAndMoveInteraction
