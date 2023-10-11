<template>
  <q-page class="q-ma-md">
    <h5 class="q-ma-sm">Minha Meta</h5>
    <div class="col-xs-12 col-sm-4 col-md-6">
      <!-- <meta-vendedor /> -->
      <q-form action="https://some-url.com" method="post">
        <div class="row">
          <div class="col-xs-12 col-sm-5 col-md-5">
            <q-input class="q-pa-md"  v-model="dtInicial" label="Data Inicial">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="dtInicial" color="orange" mask="DD-MM-YYYY" :locale="myLocale">
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
          <div class="col-xs-12 col-sm-5 col-md-5">
            <q-input class="q-pa-md"  v-model="dtFinal" label="Data Final">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="dtFinal" color="orange" mask="DD-MM-YYYY" :locale="myLocale">
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
    <div class="row">
      <div class="text-h5"> Vendas Diarias</div>
      <div class="col-xs-12 col-sm-12 col-md-12">
        <bar-chart v-if="meta" :data="meta" :options="options" />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 q-mb-xl">
        <q-table
          flat
          bordered
          title="Vendas por Dia"
          :rows="rows"
          :columns="columns"
          :rows-per-page-options="[0]"
          row-key="name"
          />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import myLocale from 'src/config/myLocale'
import BarChart from 'src/components/BarChart.vue'
import ServerUrl from 'src/config/serverUrl'
import axios from 'axios'

export default defineComponent({
  // name: 'PageName'
  setup () {
    return {
      dtInicial: ref(''),
      dtFinal: ref(''),
      myLocale: myLocale(),
      usuario: localStorage.getItem('codUsuario'),
      meta: ref([]),
      rows: ref([]),
      columns: [
        { name: 'data', label: 'Data', align: 'left', field: 'data', sortable: true },
        { name: 'megaMetaDiaria', label: 'Mega Meta Diaria', align: 'left', field: 'megaMetaDiaria', sortable: true },
        { name: 'totalVendas', label: 'Total Vendas', align: 'left', field: 'totalVendas', sortable: true },
        { name: 'metaDiaria', label: 'Meta Diaria', align: 'left', field: 'metaDiaria', sortable: true }
      ],
      options: ref({}),
      trasition: ref(false)
    }
  },
  // props: ['dtIni', 'dtFim'],
  components: {
    BarChart
  },
  beforeCreate () {
    if (this.$route.params) {
      this.dtInicial = this.$route.params.dtIni
      this.dtFinal = this.$route.params.dtFim
    }
  },
  created () {
    if (this.dtInicial !== undefined && this.dtFinal !== undefined) {
      console.log(this.dtInicial)
      this.getMetaVendedor()
    }
  },
  methods: {
    async getMetaVendedor () {
      const dtIni = this.dtInicial.split('/').reverse().join('-')
      const dtFim = this.dtFinal.split('/').reverse().join('-')
      const url = ServerUrl() + '/HostCombateAPP/VendedoresMinhasMetas?usuario=' + this.usuario + '&dtinicial=' + dtIni + '&dtfinal=' + dtFim
      await axios.get(url)
        .then((response) => {
          console.log(response.data)
          this.rows = response.data
          this.meta = {
            labels: this.rows.map(val => val.data),
            datasets: [
              {
                type: 'line',
                data: this.rows.map(val => val.megaMetaDiaria),
                label: 'Mega Meta Dairia',
                borderColor: 'red',
                backgroundColor: 'red',
                tension: 0.1
              },
              {
                type: 'bar',
                data: this.rows.map(val => val.totalVendas),
                label: 'Total Vendas',
                barPercentage: 0.5,
                backgroundColor: ['#00D8FF']
              },
              {
                type: 'line',
                data: this.rows.map(val => val.metaDiaria),
                label: 'Meta Dairia',
                borderColor: 'orange',
                backgroundColor: 'orange'
              }

            ]
          }

          this.options = {
            elements: {
              line: {
                borderWidth: 3
              }
            }
            // indexAxis: 'y',
            // scales: {
            //   x: {
            //     beginAtZero: true
            //   }
            // }
          }
        })
    }
  }
})
</script>
