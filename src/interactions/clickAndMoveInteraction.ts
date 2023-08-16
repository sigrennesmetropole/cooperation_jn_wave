import {
  AbstractInteraction,
  EventType,
  ModificationKeyType,
  PointerKeyType,
  vcsLayerName,
  type InteractionEvent,
  GeoJSONLayer,
} from '@vcmap/core'
import type { RennesApp } from '@/services/RennesApp'
import { usePointsStore } from '@/stores/points'
import { RENNES_LAYER } from '@/stores/layers'
import { useViewsStore } from '@/stores/views'
import { getUnselectedPointStyle, getSelectedPointStyle } from '../style/common'
import router from '@/router'
import type { Feature } from 'ol'
import type { Geometry } from 'ol/geom'

class mapClickAndMoveInteraction extends AbstractInteraction {
  private _rennesApp: RennesApp
  pointsLayer: GeoJSONLayer
  spotPointsLayer: GeoJSONLayer
  layers: GeoJSONLayer[]

  constructor(rennesApp: RennesApp) {
    super(EventType.CLICKMOVE, ModificationKeyType.NONE, PointerKeyType.ALL)
    this._rennesApp = rennesApp
    this.pointsLayer = this._rennesApp.layers.getByKey(
      RENNES_LAYER.customLayerContinuousMeasurement
    ) as GeoJSONLayer
    this.spotPointsLayer = this._rennesApp.layers.getByKey(
      RENNES_LAYER.customLayerSpotData
    ) as GeoJSONLayer
    this.layers = [this.pointsLayer, this.spotPointsLayer]
  }

  setPointInformationsInStore(selectedPoint: Feature) {
    const pointsStore = usePointsStore()

    if (selectedPoint[vcsLayerName] == this.pointsLayer.name) {
      pointsStore.setPointInformations(
        'real-time',
        selectedPoint.getProperty('address'),
        selectedPoint.getProperty('status'),
        selectedPoint.getProperty('lastCom'),
        selectedPoint.getProperty('latest_value'),
        selectedPoint.getProperty('conformity')
      )
    } else if (selectedPoint[vcsLayerName] == this.spotPointsLayer.name) {
      const pointType = 'spot-measurement'
      pointsStore.setPointInformations(
        pointType,
        // values to modify from layer information when available
        'address',
        'ONLINE',
        '12/12/2012 à 22h22',
        1.5,
        'conform'
      )
    }
  }

  async pipe(event: InteractionEvent): Promise<InteractionEvent> {
    const pointsStore = usePointsStore()
    const viewStore = useViewsStore()
    const selectedPoint = event.feature as Feature<Geometry>

    if (event.type & EventType.MOVE) {
      if (
        selectedPoint === undefined ||
        !this.layers
          .map((l) => l.name)
          .includes(selectedPoint[vcsLayerName] as string)
      ) {
        document.body.style.cursor = 'default'
        return event
      }
      document.body.style.cursor = 'pointer'
      return event
    } else if (event.type & EventType.CLICK) {
      for (const layer of this.layers) {
        layer.getFeatures().forEach((f) => {
          f.setStyle(getUnselectedPointStyle)
        })
      }
      if (
        selectedPoint === undefined ||
        !this.layers
          .map((l) => l.name)
          .includes(selectedPoint[vcsLayerName] as string)
      ) {
        pointsStore.resetPoint()
        router.push('/home')
        return event
      }
      selectedPoint.setStyle(getSelectedPointStyle)
      this.setPointInformationsInStore(selectedPoint)
      if (viewStore.currentView === 'home') {
        router.push('/measurements')
      }
      return event
    } else return event
  }
}

export default mapClickAndMoveInteraction
