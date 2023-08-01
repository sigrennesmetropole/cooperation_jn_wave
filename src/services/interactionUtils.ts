import type { AbstractInteraction } from '@vcmap/core'
import { viewList } from '@/model/views.model'
import { useViewsStore } from '@/stores/views'
import { RENNES_LAYER } from '@/stores/layers'
import SelectRoofInteraction from '@/interactions/selectRoofInteraction'
import ForbidenClickInteraction from '@/interactions/forbidClickInteraction'
import type { RennesApp } from '@/services/RennesApp'
import { useInteractionsStore } from '@/stores/interactions'

type InteractionsTypes =
  | typeof SelectRoofInteraction
  | typeof ForbidenClickInteraction

export function isInteractionBuilding() {}

export function isInteractionPanRoof() {}

function disableUnusedInteraction(
  rennesApp: RennesApp,
  typeInteraction: InteractionsTypes
) {
  rennesApp.maps.eventHandler.interactions.forEach((interaction) => {
    if (interaction instanceof typeInteraction) {
      interaction.setActive(false)
    }
  })
}

function activeInteraction(
  rennesApp: RennesApp,
  typeInteraction: InteractionsTypes
) {
  rennesApp.maps.eventHandler.interactions.forEach((interaction) => {
    if (interaction instanceof typeInteraction) {
      interaction.setActive(true)
    }
  })
}

function isInteractionExist(
  rennesApp: RennesApp,
  typeInteraction: InteractionsTypes
) {
  let res = false
  rennesApp.maps.eventHandler.interactions.forEach((interaction) => {
    if (interaction instanceof typeInteraction) {
      res = true
    }
  })
  return res
}

function newTypeInteraction(
  rennesApp: RennesApp,
  typeInteraction: InteractionsTypes
): AbstractInteraction | undefined {
  if (typeInteraction === SelectRoofInteraction) {
    return new SelectRoofInteraction(
      rennesApp.maps.layerCollection.getByKey(RENNES_LAYER.roof3d),
      rennesApp
    )
  }
  if (typeInteraction === ForbidenClickInteraction) {
    return new ForbidenClickInteraction()
  }
  return undefined
}

export function updateInteractionsStoreAfterViewChange() {
  const interactionsStore = useInteractionsStore()
  const viewStore = useViewsStore()
  if (viewStore.currentView === viewList.home) {
    interactionsStore.enableInteraction(ForbidenClickInteraction)
  } else {
    interactionsStore.disableInteraction(ForbidenClickInteraction)
  }
}

/**
 * Disable district interaction if too close to the ground
 * Activate selectRoofInteraction is close enough and selectable to true
 * @param rennesApp rennesApp
 */
export function updateInteractionsOnMap(rennesApp: RennesApp) {
  const interactionsStore = useInteractionsStore()
  interactionsStore.getActiveInteractions().forEach((int) => {
    if (!isInteractionExist(rennesApp, int)) {
      const interaction = newTypeInteraction(rennesApp, int)
      if (interaction) {
        rennesApp.maps.eventHandler.addPersistentInteraction(interaction)
      }
    }
    activeInteraction(rennesApp, int)
  })
  interactionsStore.getInactiveInteractions().forEach((int) => {
    disableUnusedInteraction(rennesApp, int)
  })
}

export function IsSolarPanelVisibleOnStep() {}
