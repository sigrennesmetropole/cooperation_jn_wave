import Feature from 'ol/Feature'
import type Map from 'ol/Map'
import type MapBrowserEvent from 'ol/MapBrowserEvent'
import { unByKey } from 'ol/Observable'
import Overlay from 'ol/Overlay'
import type { EventsKey } from 'ol/events'
import { LineString } from 'ol/geom'
import type Geometry from 'ol/geom/Geometry'
import Draw, { DrawEvent } from 'ol/interaction/Draw'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { getLength } from 'ol/sphere.js'
import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle'

const style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.2)',
  }),
  stroke: new Stroke({
    color: 'rgba(0, 0, 0, 0.5)',
    lineDash: [10, 10],
    width: 2,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)',
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
  }),
})

export class MeasurementTool {
  map: Map
  source: VectorSource
  /**
   * Currently drawn feature.
   */
  sketch: Feature

  /**
   * The help tooltip element.
   */
  helpTooltipElement: HTMLElement | null

  /**
   * Overlay to show the help messages.
   */
  helpTooltip: Overlay

  /**
   * The measure tooltip element.
   */
  measureTooltipElement: HTMLElement | null

  /**
   * Overlay to show the measurement.
   */
  measureTooltip: Overlay

  /**
   * Message to show when the user is drawing a line.
   */
  continueLineMsg = 'Click to continue drawing the line'

  draw: Draw
  vector: VectorLayer<VectorSource>

  constructor(map: Map) {
    this.map = map
    this.source = new VectorSource()
    this.draw = new Draw({
      source: this.source,
      type: 'LineString',
      style: style,
    })
    this.vector = new VectorLayer({
      source: this.source,
      style: {
        'fill-color': 'rgba(255, 255, 255, 0.2)',
        'stroke-color': '#FDF08A',
        'stroke-width': 4,
        'circle-radius': 7,
        'circle-fill-color': '#FDF08A',
      },
    })

    this.map.addLayer(this.vector)

    this.sketch = new Feature()
    this.helpTooltipElement = null
    this.helpTooltip = new Overlay({})
    this.measureTooltipElement = document.createElement('div')
    this.measureTooltip = new Overlay({})

    this.map.on('pointermove', (evt: MapBrowserEvent<UIEvent>) => {
      this.pointerMoveHandler(evt)
    })
  }

  pointerMoveHandler(evt: MapBrowserEvent<UIEvent>) {
    if (evt.dragging) {
      return
    }
    // console.log(`here: ${evt.coordinate}`)
    let helpMsg = 'Click to start drawing'

    if (this.sketch) {
      //   console.log('this.sketch')
      const geom = this.sketch.getGeometry()
      if (geom instanceof LineString) {
        helpMsg = this.continueLineMsg
      }
    }
    if (this.helpTooltipElement) {
      //   console.log('this.helpTooltipElement')
      this.helpTooltipElement.innerHTML = helpMsg
      this.helpTooltip.setPosition(evt.coordinate)

      this.helpTooltipElement.classList.remove('hidden')
    }
  }

  /**
   * Format length output.
   */
  formatLength(line: LineString): string {
    const length = getLength(line)
    let output
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm'
    }
    return output
  }

  /**
   * Creates a new help tooltip
   */
  createHelpTooltip() {
    console.log('create helptooltip')
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode?.removeChild(this.helpTooltipElement)
    }
    this.helpTooltipElement = document.createElement('div')
    this.helpTooltipElement.className =
      'relative bg-black/50 rounded text-white px-1 py-2 opacity-70 whitespace-nowrap text-xs cursor-default select-none hidden'

    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    })
    this.map.addOverlay(this.helpTooltip)
    console.log(`this.helpTooltip: ${this.helpTooltip}`)
  }

  /**
   * Creates a new measure tooltip
   */
  createMeasureTooltip() {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode?.removeChild(
        this.measureTooltipElement
      )
    }
    this.measureTooltipElement = document.createElement('div')
    this.measureTooltipElement.className =
      'relative bg-black/50 rounded text-white px-1 py-2 opacity-100 font-bold whitespace-nowrap text-xs cursor-default select-none '
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false,
    })
    this.map.addOverlay(this.measureTooltip)
  }

  addInteraction() {
    this.map.addInteraction(this.draw)

    this.createMeasureTooltip()
    this.createHelpTooltip()

    let listener: EventsKey | EventsKey[] | undefined
    this.draw.on('drawstart', (evt: DrawEvent) => {
      // set sketch
      this.sketch = evt.feature

      let tooltipCoord = evt.feature.getGeometry()?.getCoordinates()
      listener = this.sketch?.getGeometry()?.on('change', (evt) => {
        const geom = evt.target
        const output = this.formatLength(geom)
        tooltipCoord = geom.getLastCoordinate()
        if (!this.measureTooltipElement) {
          this.measureTooltipElement = document.createElement('div')
        }
        this.measureTooltipElement.innerHTML = output
        this.measureTooltip.setPosition(tooltipCoord)
      })
    })

    this.draw.on('drawend', () => {
      console.log(`drawend: ${this}`)
      console.log(this)
      if (!this.measureTooltipElement) {
        this.measureTooltipElement = document.createElement('div')
      }
      this.measureTooltipElement.className =
        'relative bg-[#FDF08A] rounded text-black px-1 py-2 whitespace-nowrap text-xs cursor-default select-none text-red-700 border-2 border-white'

      this.measureTooltip.setOffset([0, -7])
      // unset sketch
      this.sketch = new Feature<Geometry>()
      // unset tooltip so that a new one can be created
      this.measureTooltipElement = null
      this.createMeasureTooltip()
      if (listener) {
        unByKey(listener)
      }
    })
  }

  removeInteraction() {
    this.map.removeInteraction(this.draw)
    // this.helpTooltipElement?.remove()
    // this.measureTooltipElement?.remove()
    this.map.removeOverlay(this.measureTooltip)
    this.map.removeOverlay(this.helpTooltip)
    this.sketch = new Feature()
    const f = this.sketch
    console.log(f)
  }
}
