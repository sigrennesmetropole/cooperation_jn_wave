<script setup lang="ts">
import InformationsWavesExposure1 from '@/assets/illustrations/InformationsWavesExposureStep1.png'
import InformationsWavesExposure2 from '@/assets/illustrations/InformationsWavesExposureStep2.png'
import InformationsWavesExposure3 from '@/assets/illustrations/InformationsWavesExposureStep3.png'
import { ref } from 'vue'

const informations = [
  {
    id: 1,
    img: InformationsWavesExposure1,
    title: 'À quelles ondes sommes-nous exposés ?',
    description:
      'Les sources électromagnétiques sont multiples : téléphonie mobile, objets connectés, WIFI, appareils électroménagers, radio FM… nous évoluons tous dans un environnement électromagnétique invisible.',
  },
  {
    id: 2,
    img: InformationsWavesExposure2,
    title: 'Des ondes sous influence',
    description:
      'Les ondes sont omniprésentes et varient : À titre d’exemple, plus nous utilisons nos téléphones, plus nous sommes exposés. Notre exposition aux ondes est influencée par nos usages au quotidien.',
  },
  {
    id: 3,
    img: InformationsWavesExposure3,
    title: 'Les actions de la Ville de Rennes',
    description:
      'La Ville de Rennes met en place plusieurs dispositifs : campagnes de mesures dans les établissements sensibles, capteurs dans l’espace public, suivi des demandes de mesures des habitants, dialogue avec les opérateurs de téléphonie mobile.',
  },
]
const currentInfo = ref(1)
</script>

<template>
  <div class="rounded-lg bg-slate-100 w-full px-6 pt-6 pb-8">
    <template v-for="info in informations" :key="info.id">
      <div
        v-if="info.id === currentInfo"
        class="flex flex-col justify-center items-center"
      >
        <img class="w-[354px] h-[160px]" :src="info.img" alt="" />
        <h4 class="font-dm-sans font-bold text-lg leading-6 mt-4">
          {{ info.title }}
        </h4>
        <span
          class="font-dm-sans font-normal text-sm mt-2 text-center h-[100px]"
        >
          {{ info.description }}
        </span>
      </div>
    </template>
    <div class="flex flex-row gap-3 mt-4 justify-center items-center">
      <div
        v-for="info in informations"
        tabindex="0"
        :key="info.id"
        class="w-6 h-6 rounded-full flex justify-center items-center cursor-pointer"
        :class="
          info.id === currentInfo ? 'bg-slate-600' : 'border border-slate-300'
        "
        @click="currentInfo = info.id"
        @keydown.enter="currentInfo = info.id"
      >
        <span
          class="font-dm-sans font-bold text-xs"
          :class="info.id === currentInfo ? 'text-white' : 'text-slate-500'"
        >
          {{ info.id }}
        </span>
      </div>
    </div>
  </div>
</template>
