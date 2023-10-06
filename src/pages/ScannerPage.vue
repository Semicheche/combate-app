<template>
  <q-page class="q-ma-md">

    <q-input bottom-slots v-model="codigo" label="codigo" @click="cod" v-on:keyup.enter="getListProdutos" :dense="dense">
      <template v-slot:before>
            <q-icon name="barcode_reader" />
          </template>
          <template v-slot:append>
            <q-btn round icon="photo_camera" @click="alert = true" ></q-btn>
          </template>
    </q-input>
    <section class="q-ma-md">
      <q-btn @click="getListProdutos" color="orange" class="full-width q-ma-md q-pa-md " icon="search" label="Buscar Produto" :rounded="true" :outline="codigo" :size="600" :loading="produtos.length"/>
    </section>
    <Suspense @pending="pending" @fallback="fallback" @resolve="resolve">
      <template #default>
        <div v-if="produtos.length > 0">
          <div v-for="(prod, index) in produtos" :key="index">
            <div >
              <q-separator spaced inset />
              <q-list>
                <q-item clickable v-ripple :to="{ path: `detalhes/${prod.codigo}` }" >
                  <q-item-section>
                    <q-item-label>{{ prod.codigo }} - {{ prod.descricao }}</q-item-label>
                    <q-item-label caption lines="2">{{ prod.fabricante }} {{ prod.cor }}</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label >Disponivel</q-item-label>
                    <q-item-label class="text-bold black">{{ prod.qtdEstoqFilialDisponivel }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            </div>
          </div>
        <div v-else>
          <q-card class="my-card flex justify-center">
            <q-img src="https://media.tenor.com/8E3SIU76kHgAAAAC/barcode-scan.gif" width="200px" height="150px"  class="justify-center"/>

            <q-card-section>
              <div class="text-subtitle3"> Digite o codigo do produto ou escaneie com a Camera o codgio de Barras do produto</div>
              <!-- <div class="text-subtitle2"> </div> -->
            </q-card-section>
          </q-card>
        </div>
      </template>
      <template #fallback>
         <div class="text-center">
          <h1>LOADING</h1>
           <q-spinner-hourglass
            color="orange"
            size="4em"
          />
          <loading v-model:active="isLoading"
                    :can-cancel="true"
                    :on-cancel="onCancel"
                    :is-full-page="fullPage"
                    color="orange" />
        </div>
      </template>
  </Suspense>
    <q-dialog v-model="alert" >
      <q-card style="min-width: 350px">
        <q-card-section>
          <BarcodeReader @close-dialog="closeDialog" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script >
import BarcodeReader from 'src/components/BarcodeReader.vue'
import Loading from 'vue-loading-overlay'
import { ref, inject } from 'vue'
import serverUrl from 'src/config/serverUrl'
import axios from 'axios'

const fallback = () => {
  console.log('fallbabk')
}
const resolve = () => {
  console.log('resolve')
}

export default {
  name: 'CameraVue',
  setup () {
    return {
      isloging: inject('isloging'),
      isLoading: ref(true),
      alert: ref(false),
      codigo: ref(''),
      tab: ref('estoque'),
      produtos: ref([]),
      produto: {
        comissao: ref(null),
        precoVenda: ref(null),
        codigo: ref(null),
        qtdReservaFilial: ref(0),
        precoCusto: ref(null),
        qtdEstoqueDisponivelCD: ref(0),
        cor: ref(null),
        qtdEstoqueFilial: ref(0),
        qtdEstoqFilialDisponivel: ref(0),
        fabricante: ref(null),
        descricao: ref(null)
      }

    }
  },
  components: {
    BarcodeReader,
    Loading
  },
  methods: {
    getListProdutos () {
      this.isLoading = ref(!this.isLoading)
      if (this.codigo == null || this.codigo.trim() === '') {
        return
      }
      console.log(fallback)
      console.log(resolve)

      this.produtos = []
      const url = serverUrl() + '/HostCombateAPP/ConsultaProdutos?consultar=' + this.codigo
      console.log(url)
      axios.get(url)
        .then((response) => {
          response.data.forEach(element => {
            this.produto = { ...element }
            this.produtos.push(this.produto)
          })
          localStorage.setItem('produtos', JSON.stringify(this.produtos))
          this.isLoading = ref(!this.isLoading)
        })
    },

    // formatPrice (value) {
    //   const val = (value / 1).toFixed(2).replace('.', ',')
    //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    // },

    closeDialog (payload) {
      this.codigo = payload.codigo.value
      this.alert = false
    },

    getProdutosLocalStorage () {
      this.produtos = localStorage.produtos != null ? JSON.parse(localStorage.getItem('produtos')) : ref([])
    },

    isLogin () {
      if (!this.isloging) {
        this.$router.push('/login')
      }
    }
  },

  beforeMount () {
    this.getProdutosLocalStorage()
    this.isLogin()
  }

}

</script>
<style>

.btn-search {
  justify-content: flex-end;
  display: flex;
  border-radius: 50%;
}

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
