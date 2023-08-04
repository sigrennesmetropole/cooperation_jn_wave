import {
  VcsApp,
  VcsModule,
  CesiumMap,
  Viewpoint,
  OpenlayersMap,
  GeoJSONLayer,
} from '@vcmap/core'
import type Map from 'ol/Map.js'
import { useMapStore } from '@/stores/map'
import type { RennesLayer } from '@/stores/layers'
import displayAllContinuousMeasurement from '@/interactions/clickAndMoveInteraction'

export class RennesApp extends VcsApp {
  readonly mapConfig
  constructor(mapConfig: object) {
    super()
    this.mapConfig = mapConfig
  }

  async initializeMap() {
    const mapStore = useMapStore()
    const context = new VcsModule(this.mapConfig)
    await this.addModule(context)

    const cesiumMap = this.get3DMap()
    await cesiumMap?.initialize()
    if (cesiumMap) {
      cesiumMap.getScene().globe.maximumScreenSpaceError = 1
      const homeViewPoint = this.viewpoints.getByKey('rennes') as Viewpoint
      cesiumMap.getScene().screenSpaceCameraController.maximumZoomDistance =
        homeViewPoint.distance
      mapStore.isInitializeMap = true
      mapStore.viewPoint = homeViewPoint
    }
    await displayAllContinuousMeasurement
  }

  getHomeViewpoint() {
    return this.viewpoints.getByKey('rennes') as Viewpoint
  }

  get3DMap(): CesiumMap {
    return this.maps.getByKey('cesium') as CesiumMap
  }

  get2DMap(): OpenlayersMap {
    return this.maps.getByKey('ol') as OpenlayersMap
  }

  getOpenlayerMap(): Map {
    return this.get2DMap().olMap as Map
  }

  getCurrentDistance() {
    return this.get3DMap().getViewpointSync()?.distance
  }

  async getLayerByKey(key: RennesLayer) {
    const layer: GeoJSONLayer = this.layers.getByKey(key) as GeoJSONLayer
    if (layer) {
      await layer.fetchData()
    }

    return layer
  }
}
