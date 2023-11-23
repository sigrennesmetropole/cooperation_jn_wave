<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

import RealTimeLogo from '@/assets/icons/real-time-logo.svg'
import SpotMeasurementLogo from '@/assets/icons/spot-measurement-logo.svg'
import SitesMeasurementLogo from '@/assets/icons/sites-logo.svg'
import { useCheckboxStore } from '@/stores/checkbox'
import { PointType, usePointsStore } from '@/stores/points'

const checkboxStore = useCheckboxStore()
const pointsStore = usePointsStore()

const selectedPointRealTime = ref<boolean>(true)
const selectedPointSpotData = ref<boolean>(true)
const selectedPointEmitterSites = ref<boolean>(true)

function addPointsOnMap(pointType: PointType) {
  pointsStore.resetPointByType(pointType)
  switch (pointType) {
    case PointType.RealTime:
      checkboxStore.toggleRealTimePoint()
      break
    case PointType.SpotData:
      checkboxStore.toggleSpotDataPoint()
      break
    case PointType.EmittingSites:
      checkboxStore.toggleEmitterSitesPoint()
      break
    default:
      break
  }
  if (!pointsStore.pointType) {
    router.push('/home')
  }
}
</script>

<template>
  <div
    class="absolute right-10 top-10 flex flex-col items-start select-none bg-white w-[273px] p-4 gap-4 rounded-lg shadow-md"
  >
    <div class="flex flex-row gap-3 items-center">
      <input
        type="checkbox"
        id="rounded-checkbox"
        name="measurements-real-time"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
        value="real-time"
        v-model="selectedPointRealTime"
        @click="addPointsOnMap(PointType.RealTime)"
      />
      <label class="cursor-pointer flex flex-row" for="measurements">
        <img :src="RealTimeLogo" class="h-5 mr-3 my-auto" />Mesures en temps
        réel
      </label>
    </div>
    <div class="flex flex-row gap-3 items-center">
      <input
        type="checkbox"
        id="rounded-checkbox"
        name="measurements-spot-data"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
        value="point-data"
        v-model="selectedPointSpotData"
        @click="addPointsOnMap(PointType.SpotData)"
      />
      <label class="cursor-pointer flex flex-row" for="measurements">
        <img :src="SpotMeasurementLogo" class="h-5 mr-3 my-auto" />Mesures
        ponctuelles
      </label>
    </div>
    <div class="border-b border-neutral-300 w-full"></div>
    <div class="flex flex-row gap-3 items-center">
      <input
        type="checkbox"
        id="rounded-checkbox"
        name="measurements-wave-emitter-sites"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
        value="wave-emitter-sites"
        v-model="selectedPointEmitterSites"
        @click="addPointsOnMap(PointType.EmittingSites)"
      />
      <label class="cursor-pointer flex flex-row" for="measurements">
        <img :src="SitesMeasurementLogo" class="h-5 mr-3 my-auto" />Sites
        émetteurs d'ondes
      </label>
    </div>
  </div>
</template>

<style>
#rounded-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  position: relative;
}

#rounded-checkbox:checked {
  background-color: #ffffff;
  border-color: #000000;
}

#rounded-checkbox:checked::after {
  content: '\2713';
  font-size: 20px;
  color: black;
  position: absolute;
  top: -5px;
  left: 2px;
}
</style>
