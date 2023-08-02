<script setup lang="ts">
import { useViewsStore } from '@/stores/views'
import { UiButton } from '@sigrennesmetropole/cooperation_jn_common_ui'
import IconCrossClose from '@/assets/icons/components/IconCrossClose.vue'

const viewStore = useViewsStore()

function restartHome() {
  if (viewStore.currentView == 'legal-notice') {
    window.close()
  }
}
</script>

<template>
  <div
    class="absolute top-0 left-0 flex flex-row items-center justify-between px-9 gap-12 w-[100%] h-[72px] bg-white shadow z-40"
  >
    <div class="flex flex-row items-center">
      <slot name="title-img"></slot>
    </div>
    <slot name="mid-content"></slot>
    <div v-if="viewStore.currentView != 'end-simulation'">
      <UiButton
        class="ui-btn-secondary ui-btn-regular-size justify-center"
        :icon="IconCrossClose"
        @click="restartHome()"
      >
        <slot name="button-content"></slot>
      </UiButton>
    </div>
  </div>
</template>
