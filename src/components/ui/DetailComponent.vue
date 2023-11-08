<script setup lang="ts">
import { usePointsStore } from '@/stores/points'
import { UiButtonWithTooltip } from '@sigrennesmetropole/cooperation_jn_common_ui'
import StandardIcon from '@/assets/icons/standard.svg'
import UnderSurveillanceIcon from '@/assets/icons/under-surveillance.svg'
import NonConformingIcon from '@/assets/icons/improper.svg'
import { computed } from 'vue'

const pointStore = usePointsStore()

const ConformityLabel = computed(() => {
  if (pointStore.conformity == 'conform') {
    return StandardIcon
  } else if (pointStore.conformity == 'under surveillance') {
    return UnderSurveillanceIcon
  } else if (pointStore.conformity == 'non-conforming') {
    return NonConformingIcon
  } else {
    return null
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="relative">
      <p class="font-dm-sans font-medium text-base text-neutral-600">
        {{ pointStore.address }}
      </p>
      <p class="font-dm-sans font-normal text-sm text-neutral-400">
        Mesure effectuée le {{ pointStore.lastCom }}
      </p>
    </div>
    <div
      v-if="pointStore.status == 'ONLINE'"
      class="flex flex-row justify-between"
    >
      <div class="flex flex-row">
        <div class="flex-1 flex">
          <p class="font-dm-sans font-bold text-lg leading-6 text-green-500">
            <span class="text-2xl">{{ pointStore.latest_value }}</span> V/m
          </p>
        </div>

        <div class="relative">
          <UiButtonWithTooltip
            widthButton="4"
            heightButton="4"
            zIndex="z-10"
            text="La mesure enregistrée respecte la limite réglementaire d’exposition la plus restrictive et le seuil d’alerte maximal."
            widthBoxText="w-[300px]"
            positionTop="4px"
          ></UiButtonWithTooltip>
        </div>
      </div>

      <img :src="ConformityLabel ? ConformityLabel : undefined" />
    </div>

    <div
      v-if="pointStore.status == 'MAINTENANCE'"
      class="flex flex-row justify-between"
    >
      <p class="font-dm-sans font-bold text-lg leading-6 text-red-500">
        MAINTENANCE
      </p>
    </div>
  </div>
</template>
