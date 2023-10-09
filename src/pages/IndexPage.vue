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
import { defineComponent, ref } from 'vue'
import getUser from 'src/config/getUser'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      login: localStorage.getItem('login'),
      empresa: localStorage.logo ? localStorage.logo : 'combate',
      user: ref(null)
    }
  },
  beforeCreate () {
    if (localStorage.getItem('login') === '') {
      this.$router.push('/login')
    }
  }
})
</script>
