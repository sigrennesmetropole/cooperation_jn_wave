import mapClickAndMoveInteraction from '@/interactions/clickAndMoveInteraction'
import type { AbstractInteraction } from '@vcmap/core'
import { EventType } from '@vcmap/core'
import type { RennesApp } from './RennesApp'

type InteractionsTypes = typeof mapClickAndMoveInteraction

function newTypeInteraction(
  rennesApp: RennesApp,
  typeInteraction: InteractionsTypes
): AbstractInteraction | undefined {
  if (typeInteraction === mapClickAndMoveInteraction) {
    return new mapClickAndMoveInteraction(rennesApp)
  }
  return undefined
}

export function updateInteractionsStoreAfterViewChange(rennesApp: RennesApp) {
  if (!isInteractionExist(rennesApp, mapClickAndMoveInteraction)) {
    const interaction = newTypeInteraction(
      rennesApp,
      mapClickAndMoveInteraction
    )
    if (interaction) {
      rennesApp.maps.eventHandler.addPersistentInteraction(interaction)
    }
  }
  activeInteraction(rennesApp, mapClickAndMoveInteraction)
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
  rennesApp.maps.eventHandler.featureInteraction.setActive(EventType.CLICKMOVE)
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

/**
 * Disable district interaction if too close to the ground
 * Activate selectRoofInteraction is close enough and selectable to true
 * @param rennesApp rennesApp
 */
