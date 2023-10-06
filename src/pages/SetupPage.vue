<template>
  <q-page v-if="usuario == 'SOLUCOPRTI'">
    <SetupConfig />
  </q-page>
</template>

<script lang="ts">
import SetupConfig from 'src/components/SetupConfig.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    return {
      usuario: localStorage.getItem('usuario')
    }
  },
  components: {
    SetupConfig
  }

})
</script>
