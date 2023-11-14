<script setup lang="ts">
import { usePointsStore, PointType } from '@/stores/points'
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

const unit = computed(() => {
  if (pointStore.pointType == PointType.EmittingSites) {
    return 'm'
  } else {
    return 'V/m'
  }
})

const prefix = computed(() => {
  if (pointStore.pointType == PointType.EmittingSites) {
    return ''
  } else {
    return 'Mesure effectuée le '
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
        {{ prefix }}{{ pointStore.lastCom }}
      </p>
    </div>
    <div
      v-if="pointStore.status == 'ONLINE'"
      class="flex flex-row justify-between"
    >
      <div class="flex justify-start items-center gap-5">
        <div class="flex-1 flex">
          <p
            class="font-dm-sans font-bold text-lg leading-6"
            :class="{
              'text-black': pointStore.pointType == PointType.EmittingSites,
              'text-green-500': pointStore.pointType != PointType.EmittingSites,
            }"
          >
            <span class="text-2xl">{{ pointStore.latest_value }}</span>
            {{ unit }}
          </p>
        </div>

        <div class="relative w-8 h-4">
          <!-- A little bit hacky with positionRight, it works fine if I only use number, but if I put the unit, it will give bad location of the tooltip -->
          <UiButtonWithTooltip
            widthButton="4"
            heightButton="4"
            zIndex="z-10"
            text="La mesure enregistrée respecte la limite réglementaire d’exposition la plus restrictive et le seuil d’alerte maximal."
            widthBoxText="w-[300px]"
            positionRight="4"
            positionTop="0px"
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
