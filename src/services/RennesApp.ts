import {
  VcsApp,
  VcsModule,
  CesiumMap,
  Viewpoint,
  OpenlayersMap,
  GeoJSONLayer,
  VectorLayer,
} from '@vcmap/core'
import type Map from 'ol/Map.js'
import { useMapStore } from '@/stores/map'
import type { RennesLayer } from '@/stores/layers'
import type { Style } from 'ol/style'
import { Cartographic } from '@vcmap-cesium/engine'
import Draw from 'ol/interaction/Draw'
import VectorSource from 'ol/source/Vector'

export class RennesApp extends VcsApp {
  readonly mapConfig
  measurement
  measurementToolEnabled

  constructor(mapConfig: object) {
    super()
    this.mapConfig = mapConfig
    this.measurement = new Draw({
      source: new VectorSource(),
      type: 'LineString',
    })
    this.measurementToolEnabled = false
  }

  async initializeMap() {
    const mapStore = useMapStore()
    const context = new VcsModule(this.mapConfig)
    await this.addModule(context)

    const cesiumMap = this.get3DMap()
    await cesiumMap?.initialize()
    if (cesiumMap) {
      cesiumMap.getScene().globe.maximumScreenSpaceError = 1
      mapStore.isInitializeMap = true
    }
  }

  setMeasurementToolEnabled(enabled: boolean) {
    if (enabled) {
      this.getOpenlayerMap().addInteraction(this.measurement)
    } else {
      this.getOpenlayerMap().removeInteraction(this.measurement)
    }
    this.measurementToolEnabled = enabled
  }

  toggleMeasurementTool() {
    this.setMeasurementToolEnabled(!this.measurementToolEnabled)
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

  async setLayerStyle(layerName: string, layerStyle: (feature: any) => Style) {
    const layer: VectorLayer = this.layers.getByKey(layerName) as VectorLayer
    if (layer instanceof GeoJSONLayer) {
      layer.getFeatures().forEach((f) => {
        f.setStyle(layerStyle)
      })
    }
  }

  async getHeight(x: number, y: number) {
    const cartographic = Cartographic.fromDegrees(x, y)
    const result = await this.get3DMap()
      .getScene()!
      .sampleHeightMostDetailed([cartographic])
    if (result.length === 0) {
      return 0
    }
    const height = result[0].height
    return height
  }
}
