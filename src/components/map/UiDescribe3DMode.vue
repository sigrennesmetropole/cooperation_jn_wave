<script setup lang="ts">
import { ref } from 'vue'

const iconMultiplyWhite = new URL(
  '../../assets/icons/icon-multiply-white.svg',
  import.meta.url
).href
const clickClose = ref(false)

const close = () => {
  clickClose.value = true
}
</script>

<template>
  <div
    class="flex flex-row bg-neutral-800 rounded-lg py-4 px-5 gap-[10px] justify-center items-start"
    v-if="!clickClose"
  >
    <div
      class="flex flex-col gap-2.5 text-neutral-200 font-dm-sans font-normal text-sm cursor-default"
    >
      <div class="flex flex-row items-center">
        <p>Découvrez le mode 3D</p>
      </div>
    </div>
    <div class="ml-4">
      <img
        :src="iconMultiplyWhite"
        class="w-4 h-4 cursor-pointer ml-auto"
        @click="close()"
      />
    </div>
  </div>
</template>
