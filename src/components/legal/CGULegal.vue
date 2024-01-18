<script setup lang="ts">
import { UiCGULegal } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { useConfigStore } from '@/stores/config'
let configStore = useConfigStore()
</script>

<template>
  <UiCGULegal>
    <li>
      <a
        :href="configStore.config?.wave.links.carte_ondes_url"
        target="_blank"
        class="underline"
        >{{ configStore.config?.wave.links.carte_ondes_url }}</a
      >
      : ce site permet la consultation des mesures en temps réel d'exposition
      aux ondes électromagnétiques
    </li>
    <li>
      <a
        :href="configStore.config?.wave.links.carto_radio_url"
        target="_blank"
        class="underline"
        >{{ configStore.config?.wave.links.carto_radio_url }}</a
      >
      : ce site permet la consultation à la fois des mesures ponctuelles et des
      sites émetteurs d'ondes au sein de la Ville de Rennes
    </li>
  </UiCGULegal>
</template>
