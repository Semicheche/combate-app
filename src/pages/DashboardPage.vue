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
                      <q-date v-model="dtInicial" minimal color="orange" mask="DD-MM-YYYY" :locale="myLocale"></q-date>
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
                      <q-date v-model="dtFinal" minimal color="orange" mask="DD-MM-YYYY" :locale="myLocale"></q-date>
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
                :rows="[meta]"
                :columns="metaCol"
                :rows-per-page-options="[0]"
                row-key="name"
              />
      </div>

      <div class="col-xs-12 col-sm-6 col-md-12 q-mt-md">
        <q-separator color="black"></q-separator>
        <p class="q-ma-sm text-center text-h6">Minhas vendas {{ dtInicial }} até {{ dtFinal }}</p>
        <bar-chart  v-if="meta" :data="meta"/>
      </div>

      <!-- <div class="col-xs-12 col-sm-4 col-md-6">
        <pie-chart />
      </div> -->
    </div>
  </q-page>
</template>

<script >
import { defineComponent, ref } from 'vue'
import BarChart from 'src/components/BarChart.vue'
// import PieChart from 'src/components/PieChart.vue'
import ServerUrl from 'src/config/serverUrl'
import axios from 'axios'
// import MetaVendedor from 'src/components/MetaVendedor.vue'

export default defineComponent({
  // name: 'PageName'
  setup () {
    return {
      dtInicial: ref(null),
      dtFinal: ref(null),
      usuario: localStorage.getItem('codigo'),
      meta: ref({}),
      metaCol: [
        { name: 'totalVendas', label: 'Vendas', align: 'left', field: 'totalVendas', sortable: true },
        { name: 'totalCancelamentos', label: 'Cancelamentos', align: 'left', field: 'totalCancelamentos', sortable: true },
        { name: 'totalGeral', label: 'Total', align: 'left', field: 'totalGeral', sortable: true },
        { name: 'diasUteis', label: 'Dias Uteis', align: 'left', field: 'diasUteis', sortable: true }
      ],
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sabado'.split('_'),
        daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sab'.split('_'),
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Sep_Out_Nov_Dez'.split('_'),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: 'dias'
      }
    }
  },
  methods: {
    async getMetaVendedor () {
      const dtIni = this.dtInicial.split('/').reverse().join('-')
      const dtFim = this.dtFinal.split('/').reverse().join('-')
      const url = ServerUrl() + '/HostCombateAPP/VendedoresMinhasVendas?usuario=' + this.usuario + '&dtinicial=' + dtIni + '&dtfinal=' + dtFim
      await axios.get(url)
        .then((response) => {
          console.log(response.data)
          this.meta = { ...response.data }
          console.log(this.meta)
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
