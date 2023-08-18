<script setup lang="ts">
import expandArrow from '@/assets/icons/expand-small-bigger-retract-smaller-big.svg'
import CartoRadio from '@/assets/illustrations/carto-radio.svg'
import Anfr from '@/assets/illustrations/anfr-logo.svg'
import { UiButton } from '@sigrennesmetropole/cooperation_jn_common_ui'

function goToAnfr() {
  window.open('https://www.cartoradio.fr/#/', '_blank')
}
</script>

<template>
  <div class="flex flex-col p-6 gap-3 border rounded-lg border-slate-400">
    <div class="flex flex-row justify-between">
      <img :src="CartoRadio" class="" />
      <img :src="Anfr" class="" />
    </div>
    <p class="font-dm-sans text-sm font-normal">
      Cartoradio,
      <span class="font-medium"
        >la carte des sites et des mesures radioélectriques de l’Anfr</span
      >
      permet la consultation des informations détaillées sur les sites
      radioélectriques en France ainsi que des rapports des mesures de champs
      électromagnétiques.
    </p>
    <UiButton
      class="border border-black rounded-lg gap-3 px-4 py-3 justify-center flex flex-row mt-2 cursor-pointer w-fit"
      @click="goToAnfr()"
    >
      <div
        class="font-dm-sans text-black text-base font-medium flex flex-row gap-3"
      >
        Consulter la carte
        <img :src="expandArrow" class="h-5 w-5" />
      </div>
    </UiButton>
  </div>
</template>
