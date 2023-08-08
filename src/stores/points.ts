import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const usePointsStore = defineStore('address', () => {
  const pointType: Ref<string> = ref('')

  function setPointType(new_pointType: string) {
    pointType.value = new_pointType
  }

  function resetPointType() {
    setPointType('')
  }

  return {
    pointType,
    setPointType,
    resetPointType,
  }
})
