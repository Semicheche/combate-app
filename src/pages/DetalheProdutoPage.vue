<template>
  <q-page padding>
     <div class="col-xs-12 col-sm-12 col-md-12">
              <q-card class="my-card" flat bordered>
                <q-card-section>
                  <div class="text-h6">{{ produto.codigo }} - {{ produto.descricao }}</div>
                  <div class="text-subtitle2">{{ produto.fabricante }} {{ produto.cor }}</div><br/>
                  <div class="text-h5">R$ {{ produto.precoVenda }}</div>
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
                          <q-item-label lines="1" class="text-bold">{{ produto.qtdEstoqFilialDisponivel }} Disponivel</q-item-label>
                          <q-item-label lines="1" >{{ produto.qtdEstoqueFilial }}   Estoque Filial</q-item-label>
                          <q-item-label  v-if="produto.qtdReservaFilial >= 1"  class="text-red">{{ produto.qtdReservaFilial }} Reservado Filial</q-item-label>
                        </q-item-section>

                        <q-item-section  v-if="produto.qtdReservaFilial >= 1" side top>
                            <q-icon name="error" color="red" />
                        </q-item-section>

                      </q-item>

                      <q-separator />

                      <q-item >
                        <q-item-section avatar top>
                          <q-avatar icon="warehouse" color="orange" text-color="white"></q-avatar>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label lines="2" class="text-bold">{{ produto.qtdEstoqueDisponivelCD }}   Estoque CD</q-item-label>
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
                          <q-item-label lines="1" class="text-bold">R$ {{ formatPrice(produto.precoVenda ?? 0) }}</q-item-label>
                          <q-item-label >Preço Venda</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item >
                        <q-item-section avatar top>
                          <q-avatar icon="monetization_on" color="orange" text-color="white"></q-avatar>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label lines="1" class="text-bold">R$ {{ formatPrice(produto.precoVenda ?? 0 * (produto.comissao ?? 1 / 100)) }}</q-item-label>
                          <q-item-label >Comissão</q-item-label>
                        </q-item-section>
                      </q-item>

                      </q-list>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
         <div class="row justify-aroud">
            <div class="col-xs-12 col-sm-12 col-md-6">
              <div class="q-ma-md q-gutter-md">
                <q-btn outline @click="getProdutoFichaTecnica()" color="orange text-black full-width" size="lg" align="between">
                  <div>Ficha Tecnica</div>
                  <q-icon  size="1.5em" name="feed" />
                </q-btn>
                <q-btn outline @click="dialogImagem = !dialogImagem" color="orange full-width" size="lg" align="between">
                  <div>Imagem do produto</div>
                  <q-icon  size="1.5em" name="image" />
                </q-btn>
                <q-btn outline @click="dialogArgVenda = !dialogArgVenda" color="orange full-width" size="lg" align="between">
                  <div>Argumentos de Venda</div>
                  <q-icon  size="1.5em" name="psychology_alt" />
                </q-btn>
                <q-btn outline @click="dialogProdSimilar = !dialogProdSimilar" color="orange full-width" size="lg" align="between">
                  <div>Produto Similares</div>
                  <q-icon  size="1.5em" name="category" />
                </q-btn>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6  ">
              <div class="q-ma-md q-gutter-md">
                <q-btn outline @click="getConsultaSaldos" color="orange full-width" size="lg" align="between">
                  <div>Estoques Filiais</div>
                  <q-icon  size="1.5em" name="add_business" />
                </q-btn>
                <q-btn outline @click="dialogAddProdutos = !dialogAddProdutos" color="orange full-width" size="lg" align="between">
                  <div>Produtos Adicionais</div>
                  <q-icon  size="1.5em" name="add_shopping_cart" />
                </q-btn>
                <q-btn outline @click="dialogDesconto = !dialogDesconto" color="orange full-width" size="lg" align="between">
                  <div>Liberar Desconto</div>
                  <q-icon  size="1.5em" name="percent" />
                </q-btn>
              </div>
            </div>
          </div>
        <!-- FICHA TECNICA DIALOG-->
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
          <q-tooltip v-if="fichaTecnica" class="bg-white text-primary">Minimizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="fichaTecnica = true" :disable="fichaTecnica">
          <q-tooltip v-if="!fichaTecnica" class="bg-white text-primary">Maximizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>
      <DialogProduct :detalhes="descricaoFicha" />
    </q-card>
  </q-dialog>

   <!-- IMAGEM DIALOG-->
  <q-dialog
  v-model="dialogImagem"
  persistent
  :maximized="imagem"
  transition-show="slide-up"
  transition-hide="slide-down"
  >
  <q-card class="">
      <q-bar class="bg-orange">
        <q-space />

        <q-btn dense flat icon="minimize" @click="imagem = false" :disable="!imagem">
          <q-tooltip v-if="imagem" class="bg-white text-primary">Minimizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="imagem = true" :disable="imagem">
          <q-tooltip v-if="!imagem" class="bg-white text-primary">Maximizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>
      <DialogProduct :detalhes="descricaoImagem" />
    </q-card>
  </q-dialog>

  <!-- ARGUMENTO VENDA DIALOG-->
  <q-dialog
  v-model="dialogArgVenda"
  persistent
  :maximized="argVenda"
  transition-show="slide-up"
  transition-hide="slide-down"
  >
  <q-card class="">
      <q-bar class="bg-orange">
        <q-space />

        <q-btn dense flat icon="minimize" @click="argVenda = false" :disable="!argVenda">
          <q-tooltip v-if="argVenda" class="bg-white text-primary">Minimizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="argVenda = true" :disable="argVenda">
          <q-tooltip v-if="!argVenda" class="bg-white text-primary">Maximizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>
      <DialogProduct :detalhes="argumentoVenda" />
    </q-card>
  </q-dialog>

  <!-- PRODUTOS SIMILARES DIALOG-->
  <q-dialog
  v-model="dialogProdSimilar"
  persistent
  :maximized="prodSimilar"
  transition-show="slide-up"
  transition-hide="slide-down"
  >
  <q-card class="">
      <q-bar class="bg-orange">
        <q-space />

        <q-btn dense flat icon="minimize" @click="prodSimilar = false" :disable="!prodSimilar">
          <q-tooltip v-if="prodSimilar" class="bg-white text-primary">Minimizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="prodSimilar = true" :disable="prodSimilar">
          <q-tooltip v-if="!prodSimilar" class="bg-white text-primary">Maximizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>
      <DialogProduct :detalhes="produtosSimilares" />
    </q-card>
  </q-dialog>

  <!-- ESTOQUE FILIAIS DIALOG-->
  <q-dialog
  v-model="dialogEstoqueFilial"
  persistent
  :maximized="estFilial"
  transition-show="slide-up"
  transition-hide="slide-down"
  >
  <q-card class="">
      <q-bar class="bg-orange">
        <q-space />

        <q-btn dense flat icon="minimize" @click="estFilial = false" :disable="!estFilial">
          <q-tooltip v-if="estFilial" class="bg-white text-primary">Minimizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="estFilial = true" :disable="estFilial">
          <q-tooltip v-if="!estFilial" class="bg-white text-primary">Maximizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>
      <DialogProduct :detalhes="estoqueFilial" />
    </q-card>
  </q-dialog>

  <!-- PRODUTOS ADICIONAIS DIALOG-->
  <q-dialog
  v-model="dialogAddProdutos"
  persistent
  :maximized="addProdutos"
  transition-show="slide-up"
  transition-hide="slide-down"
  >
  <q-card class="">
      <q-bar class="bg-orange">
        <q-space />

        <q-btn dense flat icon="minimize" @click="addProdutos = false" :disable="!addProdutos">
          <q-tooltip v-if="addProdutos" class="bg-white text-primary">Minimizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="addProdutos = true" :disable="addProdutos">
          <q-tooltip v-if="!addProdutos" class="bg-white text-primary">Maximizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>
      <DialogProduct :detalhes="produtosAdicionais" />
    </q-card>
  </q-dialog>

   <!-- DESCONTOS PRODUTOS DIALOG-->
   <q-dialog
  v-model="dialogDesconto"
  persistent
  :maximized="desconto"
  transition-show="slide-up"
  transition-hide="slide-down"
  >
  <q-card class="">
      <q-bar class="bg-orange">
        <q-space />

        <q-btn dense flat icon="minimize" @click="desconto = false" :disable="!desconto">
          <q-tooltip v-if="desconto" class="bg-white text-primary">Minimizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="desconto = true" :disable="desconto">
          <q-tooltip v-if="!desconto" class="bg-white text-primary">Maximizar</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fechar</q-tooltip>
        </q-btn>
      </q-bar>
      <DialogProduct :detalhes="solicitacaoDeconto" />
    </q-card>
  </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DialogProduct from 'src/components/DialogProduct.vue'
import axios from 'axios'

export default defineComponent({
  name: 'detalhesProduto',
  props: ['codigo'],
  setup () {
    return {
      dialogImagem: ref(false),
      imagem: ref(true),

      dialogFicha: ref(false),
      fichaTecnica: ref(true),

      dialogArgVenda: ref(false),
      argVenda: ref(true),

      dialogProdSimilar: ref(false),
      prodSimilar: ref(true),

      dialogEstoqueFilial: ref(false),
      estFilial: ref(true),

      dialogAddProdutos: ref(false),
      addProdutos: ref(true),

      dialogDesconto: ref(false),
      desconto: ref(true),

      descricaoFicha: {
        titulo: 'Ficha Tecnica',
        detalhes: 'Informação não disponivel',
        descricao: ''
      },
      descricaoImagem: {
        titulo: 'Imagens do Produto',
        detalhes: 'Informação não disponivel'
      },
      argumentoVenda: {
        titulo: 'Argumentos de Venda do Produto',
        detalhes: 'Informação não disponivel'
      },
      produtosSimilares: {
        titulo: 'Produtos Similares',
        detalhes: 'Informação não disponivel'
      },
      estoqueFilial: {
        titulo: 'Estoques nas Filias',
        detalhes: 'Informação não disponivel',
        produtosEstoqueCol: [
          { name: 'disponivel', label: 'Disp', align: 'left', field: 'disponivel', sortable: true },
          { name: 'reserva', label: 'Reserva', align: 'left', field: 'reserva', sortable: true },
          { name: 'quantidade', label: 'Qtde', align: 'left', field: 'quantidade', sortable: true },
          { name: 'filial', label: 'Filial', align: 'left', field: 'filial', sortable: true }
        ],
        produtosEstoque: []
      },
      produtosAdicionais: {
        titulo: 'Produtos Adicionais',
        detalhes: 'Informação não disponivel'
      },
      solicitacaoDeconto: {
        titulo: 'Descontos do Produto',
        detalhes: 'Informação não disponivel'
      },

      tab: ref('estoque'),
      produto: ref({
        id: null,
        comissao: null,
        precoVenda: null,
        codigo: null,
        qtdReservaFilial: 0,
        precoCusto: 0,
        qtdEstoqueDisponivelCD: 0,
        cor: null,
        qtdEstoqueFilial: 0,
        qtdEstoqFilialDisponivel: 0,
        fabricante: null,
        descricao: null
      })
    }
  },
  components: {
    DialogProduct
  },
  methods: {
    serverUrl () {
      // Não sei pq o json Stringfy fode com a String e não consegui resolver enetão removi as " duplas da string
      const backendServer = process.env.BACKEND_SERVER ? process.env.BACKEND_SERVER.replaceAll('"', '') : ''
      const port = process.env.BACKEND_PORT ? process.env.BACKEND_PORT.replaceAll('"', '') : ''

      return `${backendServer}:${port}`
    },
    async getProduto () {
      const url = this.serverUrl() + '/HostCombateAPP/ConsultaProdutos?consultar=' + this.$route.params.codigo
      await axios.get(url)
        .then((response) => {
          this.produto = { ...response.data[0] }
          console.log(this.produto)
        })
    },
    formatPrice (value: number) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async getProdutoFichaTecnica () {
      const url = this.serverUrl() + '/HostCombateAPP/ConsultaFichaTecnica?consultar=' + this.codigo

      await axios.get(url)
        .then((response) => {
          this.descricaoFicha.descricao = response.data.descricao

          this.dialogFicha = !this.dialogFicha
        })
    },

    async getConsultaSaldos () {
      this.estoqueFilial.produtosEstoque = []
      const url = this.serverUrl() + '/HostCombateAPP/ConsultaSaldosPorProduto?produto=' + this.codigo

      await axios.get(url)
        .then((response) => {
          response.data.forEach((prod: never) => {
            this.estoqueFilial.produtosEstoque.push(prod)
          })

          this.dialogEstoqueFilial = !this.dialogEstoqueFilial
        })
    }

  },
  async beforeMount () {
    this.getProduto()
  }
})
</script>
