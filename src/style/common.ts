// @ts-nocheck

import { Icon, Style } from 'ol/style'
import continuousIcon from '../assets/icons/continuous.png'

export const ContinuousMeasurementStyle: Style = new Style({
  image: new Icon({
    opacity: 1,
    src: continuousIcon,
    scale: 1,
  }),
})

export const HoverContinuousMeasurementStyle: Style = new Style({
  image: new Icon({
    opacity: 1,
    src: continuousIcon,
    scale: 1.3,
  }),
})
