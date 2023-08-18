import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Feature } from 'ol'

export const usePointsStore = defineStore('point', () => {
  const pointType: Ref<string> = ref('')
  const address: Ref<string> = ref('')
  const status: Ref<string> = ref('')
  const lastCom: Ref<string> = ref('')
  const latest_value: Ref<number> = ref(0)
  const conformity: Ref<string> = ref('')
  const newPointAbscissa: Ref<number> = ref(0)
  const newPointOrdinate: Ref<number> = ref(0)
  const pointFeature: Ref<Feature | null> = ref(null)

  function setPointInformations(
    new_pointType: string,
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
  }

  function resetPoint() {
    setPointInformations('', '', '', '', 0, '')
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
    setPointInformations,
    resetPoint,
    setNewCoordinates,
    setNewPointFeatureOnSelectedInstallation,
  }
})
