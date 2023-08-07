<script setup lang="ts">
import UiWavesPointsPanelTitle from '@/components/ui/UiWavesPointsPanelTitle.vue'
import { onMounted } from 'vue'
import { usePanelsStore } from '@/stores/panels'
import { useViewsStore } from '@/stores/views'
import { viewList } from '@/model/views.model'

const panelsStore = usePanelsStore()
const viewStore = useViewsStore()

onMounted(() => {
  viewStore.setCurrentView(viewList['measurements'])
  panelsStore.setTypePanelDisplay('left')
  panelsStore.isCompletelyHidden = false
})
</script>

<template>
    <UiWavesPointsPanelTitle
        pointType="real-time"
    ></UiWavesPointsPanelTitle>

</template>