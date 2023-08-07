<script lang="ts" setup>
import realTimeLogo from '@/assets/icons/real-time-logo.svg'
import spotMeasurementLogo from '@/assets/icons/spot-measurement-logo.svg'
import sitesLogo from '@/assets/icons/sites-logo.svg'
import BackButton from '@/components/home/BackButton.vue'

import { ref } from 'vue'
import { usePointsStore } from '@/stores/points'

const pointStore = usePointsStore()
const title = ref('')
const img = ref('')

if (pointStore.pointType == 'real-time') {
  title.value = 'Mesure en temps réel'
  img.value = realTimeLogo
} else if (pointStore.pointType == 'spot-measurement') {
  title.value = 'Mesure ponctuelle'
  img.value = spotMeasurementLogo
} else {
  title.value = 'Site émetteur'
  img.value = sitesLogo
}
</script>

<template>
  <div class="flex flex-col items-start py-0 gap-2">
    <div class="flex items-center p-0 gap-4">
      <BackButton title="Retour vers la page d'accueil."></BackButton>
      <div class="flex gap-3">
        <img :src="img" class="h-12" />
        <h1 class="font-dm-sans font-bold text-2xl text-center my-auto">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>
