import { viewList } from '@/model/views.model'
import { useViewsStore } from '@/stores/views'
import ForbidenClickInteraction from '@/interactions/forbidClickInteraction'
import { useInteractionsStore } from '@/stores/interactions'

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
