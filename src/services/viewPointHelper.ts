import { Viewpoint, type ViewpointOptions } from '@vcmap/core'
import { destination, point } from '@turf/turf'
import type { BBox, Feature, Point, Properties } from '@turf/turf'

const cameraDistance = 150

export function computeViewPoint(
  turfPoint: Feature<Point, Properties>,
  vpJson: ViewpointOptions
) {
  const target = destination(
    turfPoint,
    cameraDistance * (Math.SQRT2 / 2),
    180,
    {
      units: 'meters',
    }
  )
  vpJson.cameraPosition = [
    target.geometry.coordinates[0],
    target.geometry.coordinates[1],
    cameraDistance,
  ]
  vpJson.pitch = -45
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
