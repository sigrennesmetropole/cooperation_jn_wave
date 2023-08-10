<script setup lang="ts">
import { usePanelsStore, PANEL_WIDTH } from '@/stores/panels'
import RealTimeLogo from '@/assets/icons/real-time-logo.svg'
import SpotMeasurementLogo from '@/assets/icons/spot-measurement-logo.svg'
import SitesMeasurementLogo from '@/assets/icons/sites-logo.svg'
import NewProjectsLogo from '@/assets/icons/sitesNext.svg'
import { ref } from 'vue'

const panelStore = usePanelsStore()
const selectedPointRealTime = ref<boolean>(false)
const selectedPointSpotData = ref<boolean>(false)
const selectedPointEmitterSites = ref<boolean>(false)
const selectedPointNewProjects = ref<boolean>(false)

function addPointsOnMap(nameOfPoints: string) {
  // set active the layer
  console.log(nameOfPoints)
}
</script>

<template>
  <div
    class="transition-[height] absolute right-10 top-10 flex flex-col items-start select-none bg-white h-[193px] w-[273px] p-4 gap-4 rounded-lg shadow-md"
    :style="panelStore.isRightPanel() ? `margin-right: ${PANEL_WIDTH};` : ''"
  >
    <div class="flex flex-row gap-3 items-center">
      <input
        type="checkbox"
        id="rounded-checkbox"
        name="measurements-real-time"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
        value="real-time"
        v-model="selectedPointRealTime"
        @click="addPointsOnMap('real-time')"
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
        @click="addPointsOnMap('spot-data')"
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
        @click="addPointsOnMap('emitting-sites')"
      />
      <label class="cursor-pointer flex flex-row" for="measurements">
        <img :src="SitesMeasurementLogo" class="h-5 mr-3 my-auto" />Sites
        émetteurs d'ondes
      </label>
    </div>
    <div class="flex flex-row gap-3 items-center">
      <input
        type="checkbox"
        id="rounded-checkbox"
        name="measurements-new-projects"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
        value="new-projects"
        v-model="selectedPointNewProjects"
        @click="addPointsOnMap('new-projects')"
      />
      <label class="cursor-pointer flex flex-row" for="measurements">
        <img :src="NewProjectsLogo" class="h-5 mr-3 my-auto" />Nouveaux projets
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
