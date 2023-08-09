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
import router from '@/router'

class mapClickAndMoveInteraction extends AbstractInteraction {
  private _rennesApp: RennesApp
  pointsLayer: GeoJSONLayer

  constructor(rennesApp: RennesApp) {
    super(EventType.CLICK, ModificationKeyType.NONE, PointerKeyType.ALL)
    this._rennesApp = rennesApp
    this.pointsLayer = this._rennesApp.layers.getByKey(
      RENNES_LAYER.customLayerContinuousMeasurement
    ) as GeoJSONLayer
  }

  async pipe(event: InteractionEvent): Promise<InteractionEvent> {
    const pointsStore = usePointsStore()
    const viewStore = useViewsStore()
    const selectedPoint = event.feature

    if (
      selectedPoint === undefined ||
      selectedPoint[vcsLayerName] !== this.pointsLayer.name
    ) {
      pointsStore.resetPoint()
      router.push('/home')
      return event
    }
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
  }
}

export default mapClickAndMoveInteraction
