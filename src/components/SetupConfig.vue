<template>
  <q-page>
    <h4>Configurações</h4>
    <q-separator></q-separator>
    <div class="q-ma-md q-pa-md">
      <div class="row">
        <div class="col-xs-12 col-md-10">
          <q-input outlined v-model="endereco" label="Endereço" :disable="true" />
        </div>
        <div class="col-xs-12 col-md-2">
          <q-input outlined v-model="porta" label="Porta" :disable="true" />
        </div>
      </div>

    </div>
    <q-separator></q-separator>
    <div class="q-ma-md q-pa-md">
    <div class="text-h6">Logo da Loja</div>
      <q-radio name="background_img" v-model="bgImg" val="combate" label="Combate" color="orange"></q-radio>
      <q-radio name="background_img" v-model="bgImg" val="combate_max" label="Combate Max" color="orange"></q-radio>
    </div>

  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'setupConfig',
  setup () {
    return {
      endereco: ref(process.env.BACKEND_SERVER.replaceAll('"', '')),
      porta: ref(process.env.BACKEND_PORT.replaceAll('"', '')),
      bgImg: ref(localStorage.logo)

    }
  },

  watch: {
    endereco (novoEndereco) {
      localStorage.endereco = novoEndereco
    },
    porta (novaPorta) {
      localStorage.porta = novaPorta
    },
    bgImg (novaLogo) {
      localStorage.logo = novaLogo
    }
  }

})
</script>
