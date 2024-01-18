<script setup lang="ts">
import { onBeforeMount, provide, computed } from 'vue'
import SidePanel from '@/components/home/SidePanel.vue'
import { RennesApp } from '@/services/RennesApp'
import MapComponent from '@/components/map/MapComponent.vue'
import mapConfig from '@/map.config.json'
import { useViewsStore } from '@/stores/views'
import SearchBar from '@/components/search_bar/SearchBar.vue'
import { viewList } from '@/model/views.model'
import { usePanelsStore, PANEL_WIDTH } from '@/stores/panels'
import UiSpinnerLoading from '@/components/ui/UiSpinnerLoading.vue'
import { useMapStore } from '@/stores/map'
import { displayRealTimePoints } from '@/services/real-time-mesurements-layer'

const viewStore = useViewsStore()
const panelStore = usePanelsStore()
const mapStore = useMapStore()

onBeforeMount(async () => {
  const rennesApp = new RennesApp(mapConfig)
  provide('rennesApp', rennesApp)
  await displayRealTimePoints(rennesApp)
})

function isLeftPanelRetractable() {
  const retractableList = [viewList['home'], viewList['measurements']]
  return retractableList.includes(viewStore.currentView!)
}
const isDisplaySearchBar = computed(() => {
  return [viewList.home].includes(viewStore.currentView!)
})
const isDisplayAsideAndMap = computed(() => {
  return [viewList['home'], viewList['measurements']].includes(
    viewStore.currentView!
  )
})

const panelAlignment = computed(() => {
  if (panelStore.isRightPanel()) {
    return 'right-0'
  }
  if (panelStore.isLeftPanel()) {
    return 'left-0'
  }
  // for floating-left, nothing to see
  return ''
})
const isPageFullScreen = computed(() => {
  return [viewList['legal-notice'], null].includes(viewStore.currentView!)
})

const isAlertBoxBrowserNotDisplay = computed(() => {
  const isViewNotDisplayAlertBox = [
    viewList['home'],
    viewList['legal-notice'],
    viewList['measurements'],
    null,
  ].includes(viewStore.currentView!)
  return isViewNotDisplayAlertBox
})

// Affichage du message d'alerte à la fermeture ET au rafraîchissement de la page
window.addEventListener('beforeunload', function (e) {
  if (!isAlertBoxBrowserNotDisplay.value) {
    e.preventDefault()
    /* In modern browsers, including Chrome, Firefox, and Safari, you can't customize the message shown in the dialog. The browser will provide its own message. This is to prevent malicious sites from tricking users with custom messages. */
    e.returnValue = ''
  }
})
</script>

<template>
  <main class="h-screen flex">
    <template v-if="isPageFullScreen">
      <RouterView :key="$route.fullPath" />
    </template>
    <template v-else>
      <aside
        class="z-10 absolute"
        :class="panelAlignment"
        v-if="isDisplayAsideAndMap"
      >
        <SidePanel :is-retractable="isLeftPanelRetractable()">
          <RouterView :key="$route.fullPath" />
        </SidePanel>
      </aside>

      <SearchBar
        v-if="isDisplaySearchBar"
        class="absolute z-10 top-6 left-6"
        :style="
          panelStore.isInformationPanelShown ? 'left: 480px;' : 'left: 24px;'
        "
        :isRedirectOnSearch="viewStore.currentView !== viewList.home"
      ></SearchBar>
      <div
        class="grow"
        :style="
          panelStore.isRightPanel() ? `margin-right: ${PANEL_WIDTH};` : ''
        "
      >
        <MapComponent v-if="isDisplayAsideAndMap"></MapComponent>
      </div>
    </template>

    <div
      class="h-full w-full bg-slate-600/75 absolute z-[1000] flex items-center justify-center"
      v-if="mapStore.isLoadingMap"
    >
      <UiSpinnerLoading width="50" height="50" />
    </div>
    <notifications position="top left" />
  </main>
</template>
