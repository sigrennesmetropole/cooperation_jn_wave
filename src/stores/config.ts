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
  link: {
    coopterr_link: string
    solar_link: string
    trambus_link: string
    ondes_link: string
    contact_link: string
  }
  wave: {
    carte_ondes_url: string
    carto_radio_url: string
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
