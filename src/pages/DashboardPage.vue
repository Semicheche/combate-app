<template>
  <q-page class="q-ma-md">
    <div>
      <h5 class="q-ma-sm">Minhas vendas</h5>
      <div class="col-xs-12 col-sm-4 col-md-6">
          <!-- <meta-vendedor /> -->
          <q-form action="https://some-url.com" method="post">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-5">
              <q-input class="q-pa-md"  v-model="dtInicial" label="Data Inicial">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy>
                      <q-date v-model="dtInicial"  color="orange" mask="DD-MM-YYYY" :locale="myLocale">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn label="Cancel" color="orange" flat v-close-popup></q-btn>
                          <q-btn label="OK" color="orange" flat v-close-popup></q-btn>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-5">
              <q-input class="q-pa-md"  v-model="dtFinal" label="Data Final">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy>
                      <q-date v-model="dtFinal"  color="orange" mask="DD-MM-YYYY" :locale="myLocale">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn label="Cancel" color="orange" flat v-close-popup></q-btn>
                          <q-btn label="OK" color="orange" flat v-close-popup></q-btn>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-2 col-md-2 q-mt-md">
              <q-btn class="full-width q-ma-md" color="orange" @click="getMetaVendedor">Buscar</q-btn>
            </div>
          </div>
        </q-form>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-12">
        <q-table

                title="Vendas Totais"
                dense
                virtual-scroll
                :rows="[data]"
                :columns="metaCol"
                :rows-per-page-options="[0]"
                row-key="name"
              />
      </div>
      <q-separator color="black" class="q-mt-md"></q-separator>
      <div class="col-xs-12 col-sm-6 col-md-6 q-mt-md ">
        <q-card class="q-ma-md">
          <q-card-section>
            <div class="text-h6 ">Mega Meta</div>
            <div v-if="data.megaMeta" class="text-h1 text-bold text-red">{{  data.megaMeta == 0 ?  data.megaMeta : Math.round(((data.totalGeral / data.megaMeta) * 100), 2) }}% <span class="text-h6">Concluido</span></div>
            <div v-else class="text-h1 text-bold text-red">- <span class="text-h6"> Concluido</span></div>
          </q-card-section>
        </q-card>
        <q-card class="q-ma-md">
          <q-card-section>
            <div class="text-h6 ">Meta</div>
            <div v-if="data.meta" class="text-h1 text-bold text-orange">{{ Math.round(((data.totalGeral/ data.meta) * 100), 2) }}% <span class="text-h6">Concluido</span></div>
            <div v-else class="text-h1 text-bold text-orange"> -<span class="text-h6"> Concluido</span></div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 q-mt-md q-mb-xl">

        <p class="q-ma-sm text-center text-bold">Total Vendido {{ dtInicial }} até {{ dtFinal }}</p>
        <bar-chart  v-if="meta" :data="meta" :options="options"/>
      </div>

    </div>
  </q-page>
</template>

<script >
import { defineComponent, ref } from 'vue'
import BarChart from 'src/components/BarChart.vue'
// import PieChart from 'src/components/PieChart.vue'
import ServerUrl from 'src/config/serverUrl'
import axios from 'axios'
import myLocale from 'src/config/myLocale'
// import MetaVendedor from 'src/components/MetaVendedor.vue'

export default defineComponent({
  // name: 'PageName'
  setup () {
    return {
      dtInicial: ref(null),
      dtFinal: ref(null),
      usuario: localStorage.getItem('codUsuario'),
      meta: ref({}),
      data: ref([]),
      metaCol: [
        { name: 'totalVendas', label: 'Vendas', align: 'left', field: 'totalVendas', sortable: true },
        { name: 'totalCancelamentos', label: 'Cancelamentos', align: 'left', field: 'totalCancelamentos', sortable: true },
        { name: 'totalGeral', label: 'Total', align: 'left', field: 'totalGeral', sortable: true },
        { name: 'diasUteis', label: 'Dias Uteis', align: 'left', field: 'diasUteis', sortable: true }
      ],
      options: ref({}),
      myLocale: myLocale()
    }
  },
  methods: {
    async getMetaVendedor () {
      const dtIni = this.dtInicial.split('/').reverse().join('-')
      const dtFim = this.dtFinal.split('/').reverse().join('-')
      const url = ServerUrl() + '/HostCombateAPP/VendedoresMinhasVendas?usuario=' + this.usuario + '&dtinicial=' + dtIni + '&dtfinal=' + dtFim
      await axios.get(url)
        .then((response) => {
          const novaData = response.data
          this.data = novaData

          this.meta = {
            labels: ['Vendas'],
            datasets: [
              {
                type: 'bar',
                data: [novaData.totalGeral],
                label: 'Total Vendas',
                backgroundColor: ['#41B883']
              },
              {
                type: 'line',
                fill: true,
                data: [novaData.meta, novaData.meta, novaData.meta],
                label: 'Meta',
                borderColor: 'orange',
                backgroundColor: 'orange'
              },
              {
                type: 'line',
                fill: true,
                data: [novaData.megaMeta, novaData.megaMeta, novaData.megaMeta],
                label: 'Mega Meta',
                borderColor: 'red',
                backgroundColor: 'red',
                tension: 0.1
              }

            ]
          }

          this.options = {
            responsive: true,
            scales: {
              x: {
                stacked: true
              },
              y: {
                stacked: true
              }
            },
            onClick: event => {
              console.log(event)
              console.log({ dtIini: this.dtInicial, dtFim: this.dtFinal, user: this.usuario, trasition: true })
              this.$router.push({ path: `/minha-meta/${this.dtInicial}/${this.dtFinal}` })
            }
          }
        })
    }
  },
  components: {
    BarChart
    // PieChart
    // MetaVendedor
  }
})
</script>
