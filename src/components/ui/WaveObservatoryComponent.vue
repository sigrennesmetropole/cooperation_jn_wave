<script setup lang="ts">
import expandArrow from '@/assets/icons/expand-small-bigger-retract-smaller-big.svg'
import WaveObservatory from '@/assets/illustrations/wave-observatory.svg'
import { UiButton } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { useConfigStore } from '@/stores/config'

let configStore = useConfigStore()

function goToWaveObservatory() {
  window.open(configStore.config?.wave.carte_ondes_url, '_blank')
}
</script>

<template>
  <div class="flex flex-col p-6 gap-2 border rounded-lg border-slate-400">
    <div>
      <img :src="WaveObservatory" class="px-3 pb-[7px]" />
    </div>
    <p class="font-dm-sans text-sm font-normal">
      Les mesures “en temps réel” sont enregistrées toutes les 2 heures par des
      capteurs permanents du laboratoire Exem installés par la ville de Rennes.
    </p>
    <UiButton
      class="border border-black rounded-lg gap-3 px-4 py-3 justify-center flex flex-row mt-2 cursor-pointer"
      @click="goToWaveObservatory()"
    >
      <div
        class="font-dm-sans text-black text-base font-normal flex flex-row gap-3"
      >
        Accéder à l'historique des mesures
        <img :src="expandArrow" class="h-5 w-5" />
      </div>
    </UiButton>
  </div>
</template>
