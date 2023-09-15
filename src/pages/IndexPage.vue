<template>
  <q-page class="row items-center justify-evenly">
    <q-img
        width="300px"
        :ratio="1"
        class="camera-icon"
        src="../assets/combate.jpg"
        alt="Camera icon" />
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from 'components/models'
// import ExampleComponent from 'components/ExampleComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
  // components: { ExampleComponent },
  // setup () {
  //   const todos = ref<Todo[]>([
  //     {
  //       id: 1,
  //       content: 'ct1'
  //     },
  //     {
  //       id: 2,
  //       content: 'ct2'
  //     },
  //     {
  //       id: 3,
  //       content: 'ct3'
  //     },
  //     {
  //       id: 4,
  //       content: 'ct4'
  //     },
  //     {
  //       id: 5,
  //       content: 'ct5'
  //     }
  //   ])
  //   const meta = ref<Meta>({
  //     totalCount: 1200
  //   })
  //   return { todos, meta }
  // }
})
</script>
