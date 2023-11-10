import {
  AbstractInteraction,
  EventType,
  GeoJSONLayer,
  type InteractionEvent,
  ModificationKeyType,
  PointerKeyType,
  vcsLayerName,
} from '@vcmap/core'
import type { RennesApp } from '@/services/RennesApp'
import { PointType, usePointsStore } from '@/stores/points'
import { RENNES_LAYER } from '@/stores/layers'
import { useViewsStore } from '@/stores/views'
import { getSelectedPointStyle, getUnselectedPointStyle } from '../style/common'
import router from '@/router'
import Feature from 'ol/Feature'
import type { Geometry } from 'ol/geom'
import {
  addGenericListenerForUpdatePositions,
  updatePointCoordinates,
} from '../services/AboveMapService'

class mapClickAndMoveInteraction extends AbstractInteraction {
  private _rennesApp: RennesApp
  pointsLayer: GeoJSONLayer
  spotPointsLayer: GeoJSONLayer
  emitterSitesPointsLayer: GeoJSONLayer
  newPointsLayer: GeoJSONLayer
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
    this.emitterSitesPointsLayer = this._rennesApp.layers.getByKey(
      RENNES_LAYER.customLayerEmitterSites
    ) as GeoJSONLayer
    this.newPointsLayer = this._rennesApp.layers.getByKey(
      RENNES_LAYER.customLayerNewProject
    ) as GeoJSONLayer
    this.layers = [
      this.pointsLayer,
      this.spotPointsLayer,
      this.emitterSitesPointsLayer,
      this.newPointsLayer,
    ]
  }

  setPointInformationsInStore(selectedPoint: Feature) {
    const pointsStore = usePointsStore()

    if (selectedPoint[vcsLayerName] == this.pointsLayer.name) {
      pointsStore.setPointInformations(
        PointType.RealTime,
        selectedPoint.getProperty('address'),
        selectedPoint.getProperty('status'),
        selectedPoint.getProperty('lastCom'),
        selectedPoint.getProperty('latest_value'),
        selectedPoint.getProperty('conformity')
      )
    } else if (selectedPoint[vcsLayerName] == this.spotPointsLayer.name) {
      let conformity = ''
      if (selectedPoint.getProperty('mesure_conformite') === 'Oui') {
        conformity = 'conform'
      }
      pointsStore.setPointInformations(
        PointType.SpotData,
        `${selectedPoint.getProperty('adresse')}, ${selectedPoint.getProperty(
          'commune_nom'
        )}`,
        'ONLINE', // TODO(IS): hard coded for now
        selectedPoint.getProperty('mesure_date'),
        selectedPoint.getProperty('mesure_niveau') as number,
        conformity
      )
    } else if (
      selectedPoint[vcsLayerName] == this.emitterSitesPointsLayer.name
    ) {
      pointsStore.setPointInformations(
        PointType.EmittingSites,
        // values to modify from layer information when available
        '',
        '',
        '',
        0,
        ''
      )
    } else if (selectedPoint[vcsLayerName] == this.newPointsLayer.name) {
      pointsStore.setPointInformations(
        PointType.NewProjects,
        // values to modify from layer information when available
        'address new sites',
        '',
        '',
        0,
        ''
      )
    }
  }

  async _interactionNewProject(event: InteractionEvent, geometry: Geometry) {
    const pointsStore = usePointsStore()
    if (event.type & EventType.CLICK) {
      if (event.position === undefined) {
        return
      }
      const new_feature = new Feature()
      new_feature.setGeometry(geometry)
      pointsStore.setNewPointFeatureOnSelectedInstallation(new_feature)
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
        await router.push('/home')
        return event
      }
      selectedPoint.setStyle(getSelectedPointStyle)
      this.setPointInformationsInStore(selectedPoint)
      if (selectedPoint[vcsLayerName] == 'customLayerNewProject') {
        await this._interactionNewProject(event, selectedPoint.getGeometry()!)
        updatePointCoordinates(this._rennesApp, 'point')
        addGenericListenerForUpdatePositions(this._rennesApp, 'point')
        event.stopPropagation = true
      }
      if (
        viewStore.currentView === 'home' &&
        selectedPoint[vcsLayerName] != 'customLayerNewProject'
      ) {
        router.push('/measurements')
      } else if (
        viewStore.currentView === 'measurements' &&
        selectedPoint[vcsLayerName] == 'customLayerNewProject'
      ) {
        router.push('/home')
      }
      return event
    } else return event
  }
}

export default mapClickAndMoveInteraction
