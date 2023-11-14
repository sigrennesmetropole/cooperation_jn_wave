import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Feature } from 'ol'

export enum PointType {
  RealTime = 'real-time',
  SpotData = 'spot-data',
  EmittingSites = 'emitting-sites',
  NewProjects = 'new-projects',
}
export const usePointsStore = defineStore('point', () => {
  const pointType: Ref<PointType | null> = ref(null)
  const address: Ref<string> = ref('')
  const status: Ref<string> = ref('')
  const lastCom: Ref<string> = ref('')
  const latest_value: Ref<number> = ref(0)
  const conformity: Ref<string> = ref('')
  const newPointAbscissa: Ref<number> = ref(0)
  const newPointOrdinate: Ref<number> = ref(0)
  const pointFeature: Ref<Feature | null> = ref(null)
  const categories: Ref<string[]> = ref([])

  function setPointInformations(
    new_pointType: PointType | null,
    new_address: string,
    new_status: string,
    new_lastCom: string,
    new_latest_value: number,
    new_conformity: string
  ) {
    pointType.value = new_pointType
    address.value = new_address
    status.value = new_status
    lastCom.value = new_lastCom
    latest_value.value = new_latest_value
    conformity.value = new_conformity
    if (new_pointType != PointType.EmittingSites) {
      categories.value = []
    }
  }

  function setPointCategories(new_categories: string[]) {
    categories.value = new_categories
  }

  function resetPoint() {
    setPointInformations(null, '', '', '', 0, '')
  }

  async function resetPointByType(pointTypeToReset: PointType) {
    if (pointType.value === pointTypeToReset) {
      resetPoint()
    }
  }

  function setNewCoordinates(newAbscissa: number, newOrdinate: number) {
    newPointAbscissa.value = newAbscissa
    newPointOrdinate.value = newOrdinate
  }

  function setNewPointFeatureOnSelectedInstallation(newPointFeature: Feature) {
    pointFeature.value = newPointFeature
  }

  return {
    pointType,
    address,
    status,
    lastCom,
    latest_value,
    conformity,
    newPointAbscissa,
    newPointOrdinate,
    pointFeature,
    categories,
    setPointInformations,
    resetPoint,
    setNewCoordinates,
    setNewPointFeatureOnSelectedInstallation,
    resetPointByType,
    setPointCategories,
  }
})
