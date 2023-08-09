<script setup lang="ts">
import UiWavesPointsPanelTitle from '@/components/ui/UiWavesPointsPanelTitle.vue'
import PointInformationComponent from '@/components/ui/PointInformationComponent.vue'
import PointSourceComponent from '@/components/ui/PointSourceComponent.vue'
import DetailComponent from '@/components/ui/DetailComponent.vue'
import { usePointsStore } from '@/stores/points'
import { onMounted } from 'vue'
import { useViewsStore } from '@/stores/views'
import { viewList } from '@/model/views.model'

const viewStore = useViewsStore()
const pointStore = usePointsStore()

onMounted(() => {
  viewStore.setCurrentView(viewList['measurements'])
})
</script>

<template>
  <UiWavesPointsPanelTitle></UiWavesPointsPanelTitle>
  <div class="border-b border-neutral-300"></div>
  <DetailComponent></DetailComponent>
  <PointInformationComponent>
    <template
      v-if="
        pointStore.pointType == 'real-time' ||
        pointStore.pointType == 'spot-measurement'
      "
      v-slot:content
    >
      <h4 class="font-dm-sans font-bold text-lg leading-6">
        Comprendre cette mesure
      </h4>
      <p class="font-dm-sans text-sm font-medium">
        L'unité de mesure de l'exposition aux champs électromagnétiques est le
        <span class="font-bold">Volt par mètre (V/m)</span>.
      </p>
      <p class="font-dm-sans text-sm font-medium">
        Le seuil règlementaire le plus restrictif toutes sources confondues est
        de <span class="font-bold">28 V/m</span>.
      </p>
      <p class="font-dm-sans text-sm font-medium">
        L'Agence Nationale des Fréquences (ANFR) a mis en place un dispostif
        national de surveillance et de mesure dont le seuil d'alerte est fixé à
        <span class="font-bold">6 V/m</span>.
      </p>
    </template>
    <template v-else v-slot:content>
      <h4 class="font-dm-sans font-bold text-lg leading-6">
        Qu'est ce qu'un "site émetteur" ?
      </h4>
      <p class="font-dm-sans text-sm font-medium">
        Les sites sont des infrastructures (immeubles, pylônes, châteaux d’eau,
        etc.) sur lesquelles sont implantées des antennes via des dispositifs
        techniques comme des mâts, des pylônes ou des bras de déport.
      </p>
      <p class="font-dm-sans text-sm font-medium">
        Six services sont distinguées ici : la téléphonie mobile, les réseaux
        mobiles privés, la télévision, la radio, les faisceaux hertziens et les
        autres stations.
      </p>
    </template>
  </PointInformationComponent>

  <PointSourceComponent>
    <template v-if="pointStore.pointType == 'real-time'" v-slot:content>
      <p class="font-dm-sans text-sm font-normal text-neutral-600">
        Source : Observatoire des Ondes
      </p>
    </template>
    <template v-else v-slot:content>
      <p class="font-dm-sans text-sm font-normal text-neutral-600">
        Source : Agence Nationale des Fréquences (ANFR)
      </p>
    </template>
  </PointSourceComponent>
</template>
