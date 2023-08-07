import {
  AbstractInteraction,
  EventType,
  ModificationKeyType,
  PointerKeyType,
  type InteractionEvent,
} from '@vcmap/core'
import type { RennesApp } from '@/services/RennesApp'

class mapClickAndMoveInteraction extends AbstractInteraction {
  private _rennesApp: RennesApp

  constructor(rennesApp: RennesApp) {
    super(EventType.CLICKMOVE, ModificationKeyType.NONE, PointerKeyType.ALL)
    this._rennesApp = rennesApp
  }

  async pipe(event: InteractionEvent): Promise<InteractionEvent> {
    return event
  }
}

export default mapClickAndMoveInteraction
