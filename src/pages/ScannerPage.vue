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
    <section class="q-ma-md">
      <q-btn @click="getListProdutos" color="orange" class="full-width q-ma-md q-pa-md " icon="search" label="Buscar Produto" :rounded="true" :outline="codigo" :size="600"/>
    </section>
    <div v-if="produtos.length > 0">
      <div v-for="(prod, index) in produtos" :key="index">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <q-card class="my-card" flat bordered>
                <q-card-section>
                  <div class="text-h6">{{ prod.codigo }} - {{ prod.descricao }}</div>
                  <div class="text-subtitle2">{{ prod.fabricante }} {{ prod.cor }}</div><br/>
                  <div class="text-h5">R$ {{ prod.precoVenda }}</div>
                </q-card-section>

                <q-tabs v-model="tab" class="text-orange" >
                  <q-tab label="Estoque" name="estoque" />
                  <q-tab label="Tabela de Preço" name="preco" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="estoque">

                    <q-list bordered padding class="rounded-borders" style="max-width: 100%">

                      <q-item >
                        <q-item-section avatar top>
                          <q-avatar icon="store" color="orange" text-color="white"></q-avatar>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label lines="1" class="text-bold">{{ prod.qtdEstoqFilialDisponivel }} Disponivel</q-item-label>
                          <q-item-label lines="1" >{{ prod.qtdEstoqueFilial }}   Estoque Filial</q-item-label>
                          <q-item-label  v-if="prod.qtdReservaFilial >= 1"  class="text-red">{{ prod.qtdReservaFilial }} Reservado Filial</q-item-label>
                        </q-item-section>

                        <q-item-section  v-if="prod.qtdReservaFilial >= 1" side top>
                            <q-icon name="error" color="red" />
                        </q-item-section>

                      </q-item>

                      <q-separator />

                      <q-item >
                        <q-item-section avatar top>
                          <q-avatar icon="warehouse" color="orange" text-color="white"></q-avatar>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label lines="2" class="text-bold">{{ prod.qtdEstoqueDisponivelCD }}   Estoque CD</q-item-label>
                        </q-item-section>

                      </q-item>
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="preco">
                    <q-list bordered padding class="rounded-borders" style="max-width: 100%">

                      <q-item >
                        <q-item-section avatar top>
                          <q-avatar icon="payments" color="orange" text-color="white"></q-avatar>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label lines="1" class="text-bold">R$ {{ formatPrice(prod.precoVenda) }}</q-item-label>
                          <q-item-label >Preço Venda</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item >
                        <q-item-section avatar top>
                          <q-avatar icon="monetization_on" color="orange" text-color="white"></q-avatar>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label lines="1" class="text-bold">R$ {{ formatPrice(prod.precoVenda * (prod.comissao / 100)) }}</q-item-label>
                          <q-item-label >Comissão</q-item-label>
                        </q-item-section>
                      </q-item>

                      </q-list>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
        </div>
        <div class="row justify-aroud">
            <div class="col-xs-12 col-sm-12 col-md-6">
              <div class="q-ma-md q-gutter-md">
                <q-btn outline @click="dialogFicha = !dialogFicha" color="orange text-black full-width" size="lg" align="between">
                  <div>Ficha Tecnica</div>
                  <q-icon  size="1.5em" name="feed" />
                </q-btn>
                <q-btn outline color="orange full-width" size="lg" align="between">
                  <div>Imagem do produto</div>
                  <q-icon  size="1.5em" name="image" />
                </q-btn>
                <q-btn outline color="orange full-width" size="lg" align="between">
                  <div>Argumentos de Venda</div>
                  <q-icon  size="1.5em" name="psychology_alt" />
                </q-btn>
                <q-btn outline color="orange full-width" size="lg" align="between">
                  <div>Produto Similares</div>
                  <q-icon  size="1.5em" name="category" />
                </q-btn>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6  ">
              <div class="q-ma-md q-gutter-md">
                <q-btn outline color="orange full-width" size="lg" align="between">
                  <div>Estoques Filiais</div>
                  <q-icon  size="1.5em" name="add_business" />
                </q-btn>
                <q-btn outline color="orange full-width" size="lg" align="between">
                  <div>Produtos Adicionais</div>
                  <q-icon  size="1.5em" name="add_shopping_cart" />
                </q-btn>
                <q-btn outline color="orange full-width" size="lg" align="between">
                  <div>Liberar Desconto</div>
                  <q-icon  size="1.5em" name="percent" />
                </q-btn>
              </div>
            </div>
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

    <q-dialog v-model="alert" >
      <q-card style="min-width: 350px">
        <q-card-section>
          <BarcodeReader @close-dialog="closeDialog" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- FICHA TECNICA -->
    <q-dialog
      v-model="dialogFicha"
      persistent
      :maximized="fichaTecnica"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="">
          <q-bar class="bg-orange">
            <q-space />

            <q-btn dense flat icon="minimize" @click="fichaTecnica = false" :disable="!fichaTecnica">
              <q-tooltip v-if="fichaTecnica" class="bg-white text-primary">Minimize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="crop_square" @click="fichaTecnica = true" :disable="fichaTecnica">
              <q-tooltip v-if="!fichaTecnica" class="bg-white text-primary">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="text-h6">Ficha Tecnica</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
          </q-card-section>
        </q-card>
    </q-dialog>
  </q-page>
</template>
<script >
import BarcodeReader from 'src/components/BarcodeReader.vue'
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'CameraVue',
  data () {
    return {
      dialogFicha: ref(false),
      fichaTecnica: ref(true),
      alert: ref(false),
      codigo: ref(''),
      tab: ref('estoque'),
      produtos: [],
      produto: {
        nome: 'TV Smart 50"',
        detalhes: 'Smart Tv Samsumg HD20050 OLED',
        comissao: null,
        precoVenda: null,
        codigo: null,
        qtdReservaFilial: 0,
        precoCusto: null,
        qtdEstoqueDisponivelCD: 0,
        cor: null,
        qtdEstoqueFilial: 0,
        qtdEstoqFilialDisponivel: 0,
        fabricante: null,
        descricao: null
      }
    }
  },
  components: {
    BarcodeReader
  },
  methods: {
    getListProdutos () {
      this.produtos = []
      const url = 'https://10.122.0.254:8443/HostCombateAPP/ConsultaProdutos?consultar=' + this.codigo

      axios.get(url)
        .then((response) => {
          response.data.forEach(element => {
            this.produto = { ...element }
            this.produtos.push(this.produto)
          })
        })
      console.log(this.produtos)
    },

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
