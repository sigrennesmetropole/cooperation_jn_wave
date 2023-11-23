<script setup lang="ts">
import { usePointsStore, PointType, PointCategory } from '@/stores/points'
import { UiButtonWithTooltip } from '@sigrennesmetropole/cooperation_jn_common_ui'
import StandardIcon from '@/assets/icons/standard.svg'
import UnderSurveillanceIcon from '@/assets/icons/under-surveillance.svg'
import NonConformingIcon from '@/assets/icons/improper.svg'
import OtherIcon from '@/assets/icons/other.svg'
import FHIcon from '@/assets/icons/fh.svg'
import PMRIcon from '@/assets/icons/pmr.svg'
import RadioIcon from '@/assets/icons/radio.svg'
import TelephoneIcon from '@/assets/icons/telephone.svg'
import TVIcon from '@/assets/icons/tv.svg'
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

const categories = {
  [PointCategory.telephone]: [TelephoneIcon, 'Téléphonie'],
  [PointCategory.tv]: [TVIcon, 'TV'],
  [PointCategory.radio]: [RadioIcon, 'Radio'],
  [PointCategory.pmr]: [PMRIcon, 'Réseaux mobiles privés'],
  [PointCategory.fh]: [FHIcon, 'Faisceaux hertziens'],
  [PointCategory.other]: [OtherIcon, 'Autres stations'],
}

const status = computed(() => {
  if (pointStore.pointType == PointType.RealTime) {
    return pointStore.status
  } else {
    return 'ONLINE'
  }
})

const value = computed(() => {
  // Custom rule to show -1 if the point is emitting site, the latest_value is 0, and
  // the lastCom (support nature) is Intérieur sous-terrain
  // See GSREN3D-620 for more detail
  if (
    pointStore.pointType == PointType.EmittingSites &&
    pointStore.latest_value == 0 &&
    pointStore.lastCom === 'Intérieur sous-terrain'
  ) {
    return -1
  } else {
    return pointStore.latest_value
  }
})

function convertToTitleCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase())
}

function convertToFrenchAddressCase(text: string): string {
  // List of words to keep in lowercase (prepositions and conjunctions)
  const lowercaseWords: string[] = [
    'de',
    'du',
    'des',
    'le',
    'la',
    'les',
    'et',
    'ou',
    'en',
    'sur',
    'dans',
    'avec',
  ]

  // Split the text into words
  let words: string[] = text.split(/\s+/)

  // Convert selected words to lowercase
  words = words.map((word) =>
    lowercaseWords.includes(word.toLowerCase())
      ? word.toLowerCase()
      : convertToTitleCase(word)
  )

  // Join the words back into a string
  const result: string = words.join(' ')
  return result
}

const formattedAddress = computed(() => {
  if (pointStore.pointType == PointType.EmittingSites) {
    return convertToFrenchAddressCase(pointStore.address)
  } else {
    return pointStore.address
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="relative">
      <p class="font-dm-sans font-medium text-base text-neutral-600">
        {{ formattedAddress }}
      </p>
      <p class="font-dm-sans font-normal text-sm text-neutral-400">
        {{ prefix }}{{ pointStore.lastCom }}
      </p>
    </div>
    <div v-if="status == 'ONLINE'" class="flex flex-row justify-between">
      <div class="flex justify-start items-center gap-5">
        <div class="flex-1 flex">
          <p
            class="font-dm-sans font-bold text-lg leading-6"
            :class="{
              'text-black': pointStore.pointType == PointType.EmittingSites,
              'text-green-500': pointStore.pointType != PointType.EmittingSites,
            }"
          >
            <span class="text-2xl">{{ value }}</span>
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
      class="flex flex-col items-start gap-2 self-stretch"
      v-if="pointStore.pointType == PointType.EmittingSites"
    >
      <div
        v-for="key in pointStore.categories"
        :key="key"
        class="flex items-center gap-3"
      >
        <img :src="categories[key][0]" />
        <p class="font-dm-sans text-base font-normal leading-6">
          {{ categories[key][1] }}
        </p>
      </div>
    </div>
    <div
      v-else-if="status == 'MAINTENANCE'"
      class="flex flex-row justify-between"
    >
      <p class="font-dm-sans font-bold text-lg leading-6 text-red-500">
        MAINTENANCE
      </p>
    </div>
  </div>
</template>
