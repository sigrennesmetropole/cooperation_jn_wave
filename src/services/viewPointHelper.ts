import { Viewpoint, type ViewpointOptions } from '@vcmap/core'
import { point } from '@turf/turf'
import type { BBox, Feature, Point, Properties } from '@turf/turf'

// Same as the initial distance in map.config.json
const cameraDistance = 1600

export function computeViewPoint(
  turfPoint: Feature<Point, Properties>,
  vpJson: ViewpointOptions
) {
  // By setting the groudposition without the z-value, the pitch, the camera
  // distance and set the camera position to undefined, the missing value
  // will be computed internally in the map core considering the terrain also
  // see: https://github.com/virtualcitySYSTEMS/map-core/blob/main/src/map/cesiumMap.ts#L816
  vpJson.groundPosition = [
    turfPoint.geometry.coordinates[0],
    turfPoint.geometry.coordinates[1],
  ]
  vpJson.pitch = -45
  vpJson.distance = cameraDistance
  vpJson.cameraPosition = undefined
  return new Viewpoint(vpJson)
}

export function createNewViewpointFromAddress(
  vp: Viewpoint,
  position: number[]
) {
  if (vp) {
    const vpJson: ViewpointOptions = vp?.toJSON() as ViewpointOptions
    const turfPoint = point([position[0], position[1]])
    return computeViewPoint(turfPoint, vpJson)
  }
}

export async function createCustomViewpointFromExtent(extent: BBox) {
  const vp = Viewpoint.createViewpointFromExtent(extent)
  const vpJson: ViewpointOptions = vp?.toJSON() as ViewpointOptions
  const turfPoint = point(vp.groundPosition)
  return computeViewPoint(turfPoint, vpJson)
}

export function cloneViewPointAndResetCameraPosition(
  viewpoint: Viewpoint,
  distance: number | null
): Viewpoint {
  const vpJson: ViewpointOptions = viewpoint?.toJSON() as ViewpointOptions
  // Set the camera position to null to force its position recalculation
  vpJson.cameraPosition = undefined
  vpJson.animate = true
  vpJson.duration = 0.5
  if (distance !== null) {
    vpJson.distance = distance
  }
  const newVp = new Viewpoint(vpJson)
  return newVp
}

const degreeToRadian = (degree: number): number => {
  return degree * (Math.PI / 180.0)
}

// Tilt the view point (e.g. when switch from 2D to 3D)
export function tiltViewpoint(viewpoint: Viewpoint, tiltDegree: number = 45) {
  const vpJson: ViewpointOptions = viewpoint?.toJSON() as ViewpointOptions
  vpJson.cameraPosition = undefined
  vpJson.animate = true
  vpJson.duration = 0.5

  vpJson.distance = viewpoint.distance * Math.sin(degreeToRadian(tiltDegree))
  vpJson.pitch = -tiltDegree

  const newVp = new Viewpoint(vpJson)
  return newVp
}

// Reset the tilt the view point (e.g. when switch from 3D to 2D)
export function untiltViewpoint(
  viewpoint: Viewpoint,
  untiltDegree: number = 45
) {
  const vpJson: ViewpointOptions = viewpoint?.toJSON() as ViewpointOptions
  vpJson.cameraPosition = undefined
  vpJson.animate = true
  vpJson.duration = 0.5

  vpJson.distance = viewpoint.distance / Math.sin(degreeToRadian(untiltDegree))
  vpJson.pitch = -90

  const newVp = new Viewpoint(vpJson)
  return newVp
}
