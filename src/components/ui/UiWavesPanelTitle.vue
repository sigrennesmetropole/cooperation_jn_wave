<script lang="ts" setup>
import UiWavesPanelLogo from '@/components/ui/UiWavesPanelLogo.vue'
import { UiAbstractTitle } from '@sigrennesmetropole/cooperation_jn_common_ui'

const title = 'Ondes & mesures'
const abstract =
  'Consultez les mesures d’exposition aux ondes électromagnétiques réalisées et identifiez les sites radioélectriques présents sur la Ville de Rennes.'
</script>

<template>
  <UiAbstractTitle :logo="UiWavesPanelLogo" :abstract="abstract" :title="title">
  </UiAbstractTitle>
</template>
