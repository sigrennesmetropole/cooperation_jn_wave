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
import { HoverContinuousMeasurementStyle } from '../../src/style/common'
import { ContinuousMeasurementStyle } from '../../src/style/common'
import router from '@/router'
import type { Feature } from 'ol'
import type { Geometry } from 'ol/geom'

class mapClickAndMoveInteraction extends AbstractInteraction {
  private _rennesApp: RennesApp
  pointsLayer: GeoJSONLayer

  constructor(rennesApp: RennesApp) {
    super(EventType.CLICKMOVE, ModificationKeyType.NONE, PointerKeyType.ALL)
    this._rennesApp = rennesApp
    this.pointsLayer = this._rennesApp.layers.getByKey(
      RENNES_LAYER.customLayerContinuousMeasurement
    ) as GeoJSONLayer
  }

  async pipe(event: InteractionEvent): Promise<InteractionEvent> {
    const pointsStore = usePointsStore()
    const viewStore = useViewsStore()
    const selectedPoint = event.feature as Feature<Geometry>

    if (event.type & EventType.MOVE) {
      if (
        selectedPoint === undefined ||
        selectedPoint[vcsLayerName] !== this.pointsLayer.name
      ) {
        document.body.style.cursor = 'default'
        return event
      }
      document.body.style.cursor = 'pointer'
      return event
    } else if (event.type & EventType.CLICK) {
      this.pointsLayer.getFeatures().forEach((f) => {
        f.setStyle(ContinuousMeasurementStyle)
      })

      if (
        selectedPoint === undefined ||
        selectedPoint[vcsLayerName] !== this.pointsLayer.name
      ) {
        pointsStore.resetPoint()
        router.push('/home')
        return event
      }
      selectedPoint.setStyle(HoverContinuousMeasurementStyle)
      const pointType = 'real-time'
      const address = selectedPoint.getProperty('address')
      const status = selectedPoint.getProperty('status')
      const lastCom = selectedPoint.getProperty('lastCom')
      const latest_value = selectedPoint.getProperty('latest_value')
      const conformity = selectedPoint.getProperty('conformity')
      pointsStore.setPointInformations(
        pointType,
        address,
        status,
        lastCom,
        latest_value,
        conformity
      )
      if (viewStore.currentView === 'home') {
        router.push('/measurements')
      }
      return event
    } else return event
  }
}

export default mapClickAndMoveInteraction
