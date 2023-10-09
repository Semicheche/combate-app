<template>
  <q-page>
    <SetupConfig />
  </q-page>
</template>

<script lang="ts">
import SetupConfig from 'src/components/SetupConfig.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    return {
      user: ref(null)
    }
  },
  components: {
    SetupConfig
  }

})
</script>
