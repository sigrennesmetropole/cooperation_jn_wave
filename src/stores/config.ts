import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

type ConfigType = {
  address: {
    size_begin_search: number
    nb_addresses_rva: number
    nb_addresses_organization: number
    nb_addresses_communes: number
    nb_addresses_streets: number
  }
}

export const useConfigStore = defineStore('configStore', () => {
  const config: Ref<ConfigType | null> = ref(null)

  function setConfig(newConfig: ConfigType | null) {
    config.value = newConfig
  }

  return {
    config,
    setConfig,
  }
})
