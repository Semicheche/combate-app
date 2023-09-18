<template padding>
  <StreamBarcodeReader
    @decode="onDecode"
    @loaded="onLoaded"
  ></StreamBarcodeReader>
</template>
<script setup>
import { ref } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'

const decodedText = ref('')
const emit = defineEmits(['closeDialog'])

const onLoaded = () => {
  console.log('loaded')
}

const onDecode = (text) => {
  decodedText.value = text
  // console.log(`Decode text from QR code is ${text}`)
  emit('closeDialog', { close: false, codigo: decodedText })
}
</script>
