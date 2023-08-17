import { CesiumMap } from '@vcmap/core'
import type { RennesApp } from './RennesApp'
import { getCartesianPositionFromFeature } from '@/helpers/featureHelper'
import type Feature from 'ol/Feature'
import { usePointsStore } from '@/stores/points'

export function updatePointCoordinates(
  rennesApp: RennesApp,
  storeName: string
) {
  let store: any
  if (storeName === 'point') {
    store = usePointsStore()
  }
  if (store.pointFeature !== null) {
    const newCoordinates = getCartesianPositionFromFeature(
      rennesApp,
      store.pointFeature as Feature
    )
    if (newCoordinates !== undefined) {
      store.setNewCoordinates(newCoordinates.x, newCoordinates.y)
    }
  }
}

export function addGenericListenerForUpdatePositions(
  rennesApp: RennesApp,
  storeName: string
) {
  let store: any
  if (storeName === 'point') {
    store = usePointsStore()
  }
  const map = rennesApp.maps.activeMap
  if (map instanceof CesiumMap) {
    map.getScene().postRender.addEventListener(() => {
      const vp = map.getViewpointSync()
      if (vp === null || vp === undefined) {
        return
      }
      if (
        store.previousViewPoint === null ||
        store.previousViewPoint === undefined
      ) {
        store.previousViewPoint = vp
      }
      for (const i in vp.cameraPosition) {
        if (
          vp.cameraPosition[i] !== store.previousViewPoint.cameraPosition[i]
        ) {
          store.previousViewPoint = vp
          updatePointCoordinates(rennesApp, storeName)
          break
        }
      }
    })
  } else {
    map.postRender.addEventListener(() => {
      updatePointCoordinates(rennesApp, storeName)
    })
  }
}
