<script setup lang="ts">
import { inject, computed } from 'vue'
import { cloneViewPointAndResetCameraPosition } from '@/services/viewPointHelper'

import { IconPlus } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { IconMinus } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { IconSynchronize } from '@sigrennesmetropole/cooperation_jn_common_ui'

import { UiIconButton } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { UiDescribeButtonCompass } from '@sigrennesmetropole/cooperation_jn_common_ui'

import CompassComponent from '@/components/map/CompassComponent.vue'
import IconMeasure from '@/assets/icons/measure-tool.svg'
import UiDescribe3DMode from '@/components/map/UiDescribe3DMode.vue'

import type { RennesApp } from '@/services/RennesApp'
import { usePanelsStore, PANEL_WIDTH } from '@/stores/panels'
import { useMapStore } from '@/stores/map'

const rennesApp = inject('rennesApp') as RennesApp
const panelStore = usePanelsStore()
const mapStore = useMapStore()

async function toggle3DMap() {
  mapStore.toggle3D()
}

async function zoom(out = false, zoomFactor = 2): Promise<void> {
  const activeMap = rennesApp.maps.activeMap
  const viewpoint = await activeMap?.getViewpoint()
  const maxZoom = rennesApp.get3DMap().getScene()
    .screenSpaceCameraController.maximumZoomDistance
  if (activeMap && viewpoint) {
    let distance = viewpoint.distance / zoomFactor
    if (out) {
      distance = Math.min(viewpoint.distance * zoomFactor, maxZoom)
    }

    const newVp = cloneViewPointAndResetCameraPosition(viewpoint, distance)
    await rennesApp.maps?.activeMap.gotoViewpoint(newVp)
  }
}

async function resetZoom() {
  let newVp
  newVp = rennesApp.getHomeViewpoint()
  await rennesApp.maps?.activeMap.gotoViewpoint(newVp)
}

const heightClass = computed(() => {
  if (mapStore.is3D()) {
    return ['h-[24rem]']
  }
  return ['h-90']
})

function getMeasure() {
  rennesApp.toggleMeasurementTool()
}
</script>

<template>
  <div
    :class="heightClass"
    class="transition-[height] absolute right-2 bottom-10 flex flex-col [&>*]:m-2 text-gray-dark items-center w-32 select-none"
    :style="panelStore.isRightPanel() ? `margin-right: ${PANEL_WIDTH};` : ''"
  >
    <UiIconButton
      class="rounded-lg"
      @click="getMeasure"
      ariaLabelButton="Outil de mesure"
      titleButton="Outil de mesure"
      heightTitle="30"
      widthTitle="200"
      positionX="-210"
      positionY="12"
      v-if="!mapStore.is3D()"
    >
      <img height="20" width="20" :src="IconMeasure" />
    </UiIconButton>
    <div class="flex flex-col zoom-buttons text-2xl [&>*]:p-2" role="group">
      <UiIconButton
        class="rounded-t-lg"
        @click="() => zoom(false)"
        ariaLabelButton="Zoom vers l'avant"
        titleButton="Zoom vers l'avant"
        heightTitle="30"
        widthTitle="200"
        positionX="-210"
        positionY="12"
        ><IconPlus />
      </UiIconButton>
      <UiIconButton
        @click="() => zoom(true)"
        ariaLabelButton="Zoom vers l'arrière"
        titleButton="Zoom vers l'arrière"
        heightTitle="30"
        widthTitle="200"
        positionX="-210"
        positionY="12"
        ><IconMinus />
      </UiIconButton>
      <UiIconButton
        class="rounded-b-lg"
        @click="() => resetZoom()"
        ariaLabelButton="Réinitialiser le zoom"
        titleButton="Réinitialiser le zoom"
        heightTitle="30"
        widthTitle="200"
        positionX="-210"
        positionY="12"
      >
        <IconSynchronize />
      </UiIconButton>
    </div>

    <UiIconButton
      class="rounded-lg"
      @click="toggle3DMap"
      :ariaLabelButton="
        mapStore.is3D() ? 'Passer la carte en 2D' : 'Passer la carte en 3D'
      "
      :titleButton="
        mapStore.is3D() ? 'Passer la carte en 2D' : 'Passer la carte en 3D'
      "
      heightTitle="30"
      widthTitle="200"
      positionX="-210"
      positionY="12"
    >
      {{ mapStore.is3D() ? '2D' : '3D' }}
    </UiIconButton>
    <CompassComponent v-if="mapStore.is3D()" />
  </div>

  <div
    class="absolute right-[130px] bottom-12"
    v-if="!panelStore.isRightPanel()"
  >
    <UiDescribeButtonCompass v-if="mapStore.is3D()"></UiDescribeButtonCompass>
    <UiDescribe3DMode v-else></UiDescribe3DMode>
  </div>
</template>
