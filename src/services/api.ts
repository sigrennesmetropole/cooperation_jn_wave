import { RennesNotification } from '@/services/notification'
import { getUrlBackOffice } from '@/services/env'

class ApiService {
  async callApiGet(
    url: string,
    errorMsg: string = 'Une erreur est survenue, veuillez réessayer.'
  ) {
    try {
      const response = await fetch(getUrlBackOffice() + url, {
        method: 'GET',
        credentials: 'include',
      })

      if (response.status !== 200) {
        throw new Error(`HTTP error status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      const notif = new RennesNotification('error', errorMsg)
      notif.displayNotification()
    }
  }
}

export const apiService = new ApiService()
