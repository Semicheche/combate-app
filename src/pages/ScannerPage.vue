<template>
  <div style="padding: 10px 15px;">
  <q-input bottom-slots v-model="text" label="codigo" :dense="dense">
    <template v-slot:before>
          <q-icon name="barcode_reader" />
        </template>
        <template v-slot:append>
          <q-btn round icon="photo_camera" @click="alert = true" ></q-btn>
        </template>
  </q-input>

  <q-dialog v-model="alert">
    <q-card style="min-width: 350px">
      <q-card-section>
        <BarcodeReader />
      </q-card-section>
    </q-card>
  </q-dialog>
  </div>
</template>
<script >
import BarcodeReader from 'src/components/BarcodeReader.vue'
import { ref } from 'vue'
export default {
  name: 'CameraVue',
  data () {
    return {
      alert: ref(false),
      isCameraOpen: false,
      isPhotoTaken: false

    }
  },
  components: {
    BarcodeReader
  }

}

</script>
<style>

</style>
<!-- <template>
  <q-page class="row items-center justify-evenly">
    <q-btn
    @click="toggleCamera()"
    icon="photo_camera"></q-btn>
  </q-page>
</template>

<script lang="ts">
import toggleCamera from 'components/CameraVue.vue'
// eslint-disable-next-line no-undef
export default defineComponent({
  name: 'MainLayout',

  methods: {
    toggleCamera
  }
})
</script> -->
