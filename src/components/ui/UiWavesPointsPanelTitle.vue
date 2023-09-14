<script lang="ts" setup>
import realTimeLogo from '@/assets/icons/real-time-logo.svg'
import spotMeasurementLogo from '@/assets/icons/spot-measurement-logo.svg'
import sitesLogo from '@/assets/icons/sites-logo.svg'
import BackButton from '@/components/home/BackButton.vue'

import { computed } from 'vue'
import { PointType, usePointsStore } from '@/stores/points'

const pointStore = usePointsStore()

const data = computed(() => {
  if (pointStore.pointType == PointType.RealTime) {
    return {
      title: 'Mesure en temps réel',
      img: realTimeLogo,
    }
  } else if (pointStore.pointType == PointType.SpotData) {
    return {
      title: 'Mesure ponctuelle',
      img: spotMeasurementLogo,
    }
  } else if (pointStore.pointType == PointType.EmittingSites) {
    return {
      title: 'Site émetteur',
      img: sitesLogo,
    }
  } else {
    return {
      title: '',
      img: '',
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-start py-0 gap-2">
    <div class="flex items-center p-0 gap-4">
      <BackButton title="Retour vers la page d'accueil."></BackButton>
      <div class="flex gap-3">
        <img :src="data.img" class="h-12" />
        <h1 class="font-dm-sans font-bold text-2xl text-center my-auto">
          {{ data.title }}
        </h1>
      </div>
    </div>
  </div>
</template>
