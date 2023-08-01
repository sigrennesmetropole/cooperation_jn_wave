import {
  AbstractInteraction,
  EventType,
  GeoJSONLayer,
  ModificationKeyType,
} from '@vcmap/core'
import type { InteractionEvent } from '@vcmap/core'
import type { RennesApp } from '../services/RennesApp'

import { RENNES_LAYER } from '@/stores/layers'

import { selectedDistrict } from '@/services/viewStyles'

class SelectDistrictInteraction extends AbstractInteraction {
  _rennesApp: RennesApp
  irisLayer: GeoJSONLayer
  customDistrictLayer: GeoJSONLayer
  currentIrisCode: string | null = null

  constructor(rennesApp: RennesApp) {
    super(EventType.CLICK, ModificationKeyType.NONE)
    this._rennesApp = rennesApp
    this.setActive(true)
    this.irisLayer = this._rennesApp.layers.getByKey(
      RENNES_LAYER.iris
    ) as GeoJSONLayer
    this.customDistrictLayer = this._rennesApp.layers.getByKey(
      RENNES_LAYER.customLayerDistrict
    ) as GeoJSONLayer
  }

  async getDistrictDatas() {}

  setActive(active?: boolean | number) {
    if (!active) {
      document.body.style.cursor = 'default'
      this._unhighlight()
      this.customDistrictLayer.removeAllFeatures()
    } else {
      document.body.style.cursor = 'pointer'
    }
    super.setActive(active)
  }

  _unhighlight() {
    this.irisLayer.featureVisibility.clearHighlighting()
  }

  _highlight(featureId: string | number) {
    this._unhighlight()
    this.irisLayer.featureVisibility.highlight({
      [featureId]: selectedDistrict,
    })
  }

  async _interactionDistrict() {}

  async pipe(event: InteractionEvent) {
    return event
  }
}

export default SelectDistrictInteraction
