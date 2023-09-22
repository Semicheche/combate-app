<template>
  <q-page class="row items-center justify-evenly">
    <q-img
        v-if="empresa == 'combate'"
        width="500px"
        :ratio="1"
        class="camera-icon"
        src="../assets/combate.jpg"
        alt="Camera icon" />
    <q-img v-else
        width="500px"
        :ratio="16/9"
        class="camera-icon"
        src="../assets/combate_max.png"
        alt="Camera icon" />
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from 'components/models'
// import ExampleComponent from 'components/ExampleComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      empresa: 'combate_max'
    }
  }
})
</script>
