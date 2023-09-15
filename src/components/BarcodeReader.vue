<template padding>
  <StreamBarcodeReader
    @decode="onDecode"
    @loaded="onLoaded"
  ></StreamBarcodeReader>
  <!-- <h4>{{ decodedText }}</h4> -->
</template>
<script setup>
import { ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'

const decodedText = ref('')

const onLoaded = () => {
  console.log('loaded')
}

const onDecode = (text) => {
  decodedText.value = text
  console.log(`Decode text from QR code is ${text}`)
}
</script>
