<template>
  <q-page class="q-ma-md">
    <q-input bottom-slots v-model="codigo" label="codigo" @click="cod" :dense="dense">
      <template v-slot:before>
            <q-icon name="barcode_reader" />
          </template>
          <template v-slot:append>
            <q-btn round icon="photo_camera" @click="alert = true" ></q-btn>
          </template>
    </q-input>

    <div v-if="produto.id" class="row">
        <div class="col-xs-12 col-sm-4 col-md-4">
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div class="text-h6">{{ produto.nome }}</div>
              <div class="text-subtitle2">{{ produto.detalhes }}</div>
            </q-card-section>

            <q-tabs v-model="tab" class="text-orange" >
              <q-tab label="Estoque" name="estoque" />
              <q-tab label="Tabela de Preço" name="preco" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="estoque">
                <q-list bordered padding v-for="(item, index) in produto.estoques" :key="index" class="rounded-borders" style="max-width: 100%">

                  <q-item >
                    <q-item-section avatar top>
                      <q-avatar :icon="item.icon" color="orange" text-color="white"></q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1" class="text-bold">{{ item.qtd }}</q-item-label>
                      <q-item-label caption>{{ item.localizacao }}</q-item-label>
                    </q-item-section>

                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="preco">
                <q-list bordered padding v-for="(preco, index) in produto.formaPagamentos" :key="index" class="rounded-borders" style="max-width: 100%">

                  <q-item >
                    <q-item-section avatar top>
                      <q-avatar :icon="preco.icon" color="orange" text-color="white"></q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1" class="text-bold">{{ preco.currency }} {{ formatPrice(preco.valor) }}</q-item-label>
                      <q-item-label caption>{{ preco.descricao }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
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
    <q-btn @click="getProduto" color="orange" class="full-width q-ma-md q-pa-md btn-search" icon="search" label="Buscar Produto" :rounded="true" :outline="codigo" :size="600"/>
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
import { ref } from 'vue'
export default {
  name: 'CameraVue',
  data () {
    return {
      alert: ref(false),
      codigo: ref(''),
      tab: ref('estoque'),
      produto: {
        id: null,
        nome: 'TV Smart 50"',
        detalhes: 'Smart Tv Samsumg HD20050 OLED',
        estoques: [
          {
            localizacao: 'Loja',
            icon: 'store',
            qtd: 2
          },
          {
            localizacao: 'Deposito 01',
            icon: 'warehouse',
            qtd: 20
          },
          {
            localizacao: 'Deposito 02',
            icon: 'warehouse',
            qtd: 15
          }
        ],
        formaPagamentos: [
          {
            descricao: 'Preço a vista ou pix com desconto 10%',
            valor: 1990,
            icon: 'pix',
            currency: 'R$'
          },
          {
            descricao: '12x sem juros nos cartões',
            valor: 1990,
            icon: 'credit_card',
            currency: 'R$'
          },
          {
            descricao: '12X no Crediario propio',
            valor: 1990,
            icon: 'money',
            currency: 'R$'
          }
        ]
      }
    }
  },
  components: {
    BarcodeReader
  },
  methods: {
    getProduto () {
      this.produto.id = this.codigo
    },

    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    closeDialog (payload) {
      this.codigo = payload.codigo.value
      this.alert = false
    }
  }

}

</script>
<style>

.btn-search {
  position: absolute;
  bottom: 0;
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
