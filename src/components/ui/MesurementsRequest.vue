<script setup lang="ts">
import ExpandArrow from '@/assets/icons/icon-external-link-white-thin.svg'
import { UiButton } from '@sigrennesmetropole/cooperation_jn_common_ui'
// import { getStringFromConfig } from '@/services/configService'

// A Ajouter dans le back
// const anfr_link = getStringFromConfig('link.anfr_link')
const anfr_link = 'https://mesures.anfr.fr/#/'

function goToANFRPage() {
  window.open(anfr_link, '_blank')
}
</script>

<template>
  <div
    class="border border-neutral-400 rounded-lg px-4 pt-4 pb-6 flex-col text-center"
  >
    <p class="font-dm-sans text-sm font-normal mb-4">
      Toute personne peut faire mesurer gratuitement l’exposition aux ondes
      électromagnétiques.
    </p>
    <UiButton
      class="ui-btn-primary gap-3 px-4 py-3 justify-center flex flex-row mx-auto"
      @click="goToANFRPage()"
    >
      <div
        class="font-dm-sans text-white text-base font-medium flex flex-row gap-3"
      >
        <img :src="ExpandArrow" class="h-5 w-5" />
        Adresser une demande en ligne
      </div>
    </UiButton>
  </div>
</template>
