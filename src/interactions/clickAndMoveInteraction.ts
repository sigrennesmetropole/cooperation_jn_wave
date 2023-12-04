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
import { PointCategory, PointType, usePointsStore } from '@/stores/points'
import { RENNES_LAYER } from '@/stores/layers'
import { useViewsStore } from '@/stores/views'
import { getSelectedPointStyle, getUnselectedPointStyle } from '../style/common'
import router from '@/router'
import Feature from 'ol/Feature'
import type { Geometry } from 'ol/geom'
import { useHomeStore } from '@/stores/home'

class mapClickAndMoveInteraction extends AbstractInteraction {
  private _rennesApp: RennesApp
  pointsLayer: GeoJSONLayer
  spotPointsLayer: GeoJSONLayer
  emitterSitesPointsLayer: GeoJSONLayer
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

    this.layers = [
      this.pointsLayer,
      this.spotPointsLayer,
      this.emitterSitesPointsLayer,
    ]
  }

  // Retrieve valid point categories for a feature (only applies for EmittingSites)
  // Valid if the value of the attribute is more than 0
  getValidPointCategories(
    selectedPoint: Feature<Geometry>
  ): Array<PointCategory> {
    const categories: Array<PointCategory> = []
    const attributeMapping: Record<PointCategory, string> = {
      [PointCategory.telephone]: 'nb_antennes_tel_mobile',
      [PointCategory.tv]: 'nb_antennes_television',
      [PointCategory.radio]: 'nb_antennes_radio',
      [PointCategory.pmr]: 'nb_antennes_prives',
      [PointCategory.fh]: 'nb_antennes_fh',
      [PointCategory.other]: 'nb_antennes_autre',
    }
    for (const key in attributeMapping) {
      const fieldName = attributeMapping[key as PointCategory]
      const value = selectedPoint.getProperty(fieldName) as number
      if (value > 0) {
        categories.push(key as PointCategory)
      }
    }
    return categories
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
        '', // Not applicable for Spot Data
        selectedPoint.getProperty('mesure_date'),
        selectedPoint.getProperty('mesure_niveau') as number,
        conformity
      )
    } else if (
      selectedPoint[vcsLayerName] == this.emitterSitesPointsLayer.name
    ) {
      pointsStore.setPointInformations(
        PointType.EmittingSites,
        `${selectedPoint.getProperty('adresse')}`,
        '', // Not applicable for Emitting Sites
        selectedPoint.getProperty('support_nature'),
        selectedPoint.getProperty('support_hauteur') as number,
        '' // Not applicable for Emitting Sites
      )
      pointsStore.setPointCategories(
        this.getValidPointCategories(selectedPoint)
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
    const homeStore = useHomeStore()
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
        // If the measurement tool is active, do not go to home view (keep in the current view)
        if (homeStore.isMeasurementToolActive) {
          return event
        } else {
          pointsStore.resetPoint()
          await router.push('/home')
          return event
        }
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
