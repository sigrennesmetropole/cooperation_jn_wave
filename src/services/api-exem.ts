import { apiService } from '@/services/api'

class ApiExemService {
  async getSiteMeasurement(id: string) {
    const data = await apiService.callApiGet(`/api/sitemeasurement/${id}`)
    return data
  }

  async getSitesMeasurement() {
    const data = await apiService.callApiGet(`/api/sitesmeasurement`)
    return data
  }
}

export const apiExemService = new ApiExemService()
