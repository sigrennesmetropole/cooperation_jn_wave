import { CesiumMap } from '@vcmap/core'
import type { RennesApp } from './RennesApp'
import { getCartesianPositionFromFeature } from '@/helpers/featureHelper'
import type Feature from 'ol/Feature'

export function updatePointCoordinates(rennesApp: RennesApp) {
  let store: any

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

export function addGenericListenerForUpdatePositions(rennesApp: RennesApp) {
  let store: any

  const map = rennesApp.maps.activeMap
  if (!(map instanceof CesiumMap)) {
    return
  }
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
      if (vp.cameraPosition[i] !== store.previousViewPoint.cameraPosition[i]) {
        store.previousViewPoint = vp
        updatePointCoordinates(rennesApp)
        break
      }
    }
  })
}
