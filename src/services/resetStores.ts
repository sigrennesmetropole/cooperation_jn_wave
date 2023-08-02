import { useAddressStore } from '@/stores/address'
import { useViewsStore } from '@/stores/views'

export const WINDOW_CONFIRM_MESSAGE =
  'Cette action vous renvoie en début de simulation, vos données actuelles seront effacées'

export function resetStores() {
  const addressStore = useAddressStore()
  const viewStore = useViewsStore()

  if (viewStore.previousRoute !== 'home') {
    addressStore.resetAddress()
  }
  addressStore.resetLatitureAndLongitude()
}
