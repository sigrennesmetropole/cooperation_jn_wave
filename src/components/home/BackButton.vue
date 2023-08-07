<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChevronArrowLeft from '@/assets/icons/chevron-left.svg'
import UiButton from '@/components/ui/UiButton.vue'
import { usePanelsStore } from '@/stores/panels'

const router = useRouter()
const panelStore = usePanelsStore()

function backButtonClicked() {
  router.push('/home')
  panelStore.isInformationPanelShown = true
}
</script>

<template>
  <UiButton
    class="shadow-md rounded-lg p-2 flex h-9 w-9 gap-2.5 shrink-0 grow-0 visible ui-btn-floating"
    @click="backButtonClicked"
  >
    <img :src="ChevronArrowLeft" />
  </UiButton>
</template>
<style></style>
