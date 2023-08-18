<script setup lang="ts">
import expandIcon from '@/assets/icons/expand-small-bigger-retract-smaller-big.svg'
import { usePointsStore } from '@/stores/points'
import { computed } from 'vue'

const pointsStore = usePointsStore()

const positionStyle = computed(() => {
  let style: string = ''
  const tooltipWidth = 250
  const tooltipHeight = 140
  let leftPosition = null
  let topPosition = null
  if (pointsStore.newPointAbscissa + tooltipWidth > window.innerWidth) {
    leftPosition = pointsStore.newPointAbscissa - tooltipWidth
  } else {
    leftPosition = pointsStore.newPointAbscissa
  }

  if (pointsStore.newPointOrdinate + tooltipHeight > window.innerHeight) {
    topPosition = pointsStore.newPointOrdinate - tooltipHeight
  } else {
    topPosition = pointsStore.newPointOrdinate
  }

  if (
    leftPosition + tooltipWidth > window.innerWidth ||
    topPosition + tooltipHeight > window.innerHeight
  ) {
    style = 'display: none;'
  } else if (leftPosition !== null && topPosition !== null) {
    style = `left: ${leftPosition}px; top: ${topPosition}px;`
  }

  return style
})
</script>

<template>
  <div
    class="absolute flex flex-col items-start bg-white p-6 gap-3 rounded-lg shadow-md cursor-default"
    :style="positionStyle"
    v-if="pointsStore.pointType == 'new-projects'"
  >
    <h4 class="font-dm-sans text-lg leading-6 font-bold">Nouveau projet</h4>
    <p class="font-dm-sans text-base font-medium text-neutral-600">
      {{ pointsStore.address }}
    </p>
    <a
      href="https://metropole.rennes.fr/les-ondes-electromagnetiques"
      target="_blank"
      class="cursor-pointer"
    >
      <div class="flex flex-row">
        <p class="font-dm-sans text-sm font-medium underline">
          Tous les projets
        </p>
        <img :src="expandIcon" class="w-2 h-2 ml-2 mt-2" />
      </div>
    </a>
  </div>
</template>
