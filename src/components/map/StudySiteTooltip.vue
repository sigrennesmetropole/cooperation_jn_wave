<script setup lang="ts">
import expandIcon from '@/assets/icons/expand-small-bigger-retract-smaller-big.svg'

// When the data will be available, replace the address with pointStore.address
</script>

<template>
  <div
    class="absolute right-10 top-60 flex flex-col items-start bg-white h-[140px] w-[250px] p-6 gap-3 rounded-lg shadow-md cursor-default"
  >
    <h4 class="font-dm-sans text-lg leading-6 font-bold">Nouveau projet</h4>
    <p class="font-dm-sans text-base font-medium text-neutral-600">
      4 rue Saint Yves
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
