<script setup lang="ts">
import FooterAreaLink from '@/components/home/FooterAreaLink.vue'
import UiWavesPanelTitle from '@/components/ui/UiWavesPanelTitle.vue'
import InformationsWavesExposure from '@/components/home/InformationsWavesExposure.vue'
import MesurementsRequest from '@/components/ui/MesurementsRequest.vue'
import { onMounted } from 'vue'
import { usePanelsStore } from '@/stores/panels'
import { useViewsStore } from '@/stores/views'
import { viewList } from '@/model/views.model'

const panelsStore = usePanelsStore()
const viewStore = useViewsStore()

onMounted(() => {
  viewStore.setCurrentView(viewList['home'])
  panelsStore.setTypePanelDisplay('left')
  panelsStore.isCompletelyHidden = false
})
</script>

<template>
  <UiWavesPanelTitle></UiWavesPanelTitle>
  <InformationsWavesExposure></InformationsWavesExposure>
  <MesurementsRequest></MesurementsRequest>
  <FooterAreaLink></FooterAreaLink>
</template>
