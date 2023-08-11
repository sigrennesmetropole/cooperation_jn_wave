import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const usePointsStore = defineStore('point', () => {
  const pointType: Ref<string> = ref('')
  const address: Ref<string> = ref('')
  const status: Ref<string> = ref('')
  const lastCom: Ref<string> = ref('')
  const latest_value: Ref<number> = ref(0)
  const conformity: Ref<string> = ref('')

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

  return {
    pointType,
    address,
    status,
    lastCom,
    latest_value,
    conformity,
    setPointInformations,
    resetPoint,
  }
})
