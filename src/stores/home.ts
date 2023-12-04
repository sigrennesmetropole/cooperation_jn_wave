import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', () => {
  const isTermOfUseAccepted: Ref<boolean> = ref(false)
  const displayError: Ref<boolean> = ref(false)
  const isMeasurementToolActive: Ref<boolean> = ref(false)

  function setIsTermOfUseAccepted(newValue: boolean) {
    isTermOfUseAccepted.value = newValue
  }

  function setDisplayError(newValue: boolean) {
    displayError.value = newValue
  }

  function toggleMeasurementTool() {
    isMeasurementToolActive.value = !isMeasurementToolActive.value
  }

  return {
    isTermOfUseAccepted,
    displayError,
    isMeasurementToolActive,
    setIsTermOfUseAccepted,
    setDisplayError,
    toggleMeasurementTool,
  }
})
