<template>
      <h1></h1>
</template>
<script>
import { defineComponent, ref } from 'vue'
import ServerUrl from 'src/config/serverUrl'
import axios from 'axios'

export default defineComponent({
  name: 'MetaVendedor',
  setup () {
    return {
      dtInicial: ref(null),
      dtFinal: ref(null),
      usuario: localStorage.getItem('codigo'),
      meta: ref({}),
      metaCol: [
        { name: 'totalVendas', label: 'Vendas', align: 'left', field: 'totalVendas', sortable: true },
        { name: 'totalCancelamentos', label: 'Cancelamentos', align: 'left', field: 'totalCancelamentos', sortable: true, color: 'red' },
        { name: 'totalGeral', label: 'Total', align: 'left', field: 'totalGeral', sortable: true },
        { name: 'diasUteis', label: 'Dias Uteis', align: 'left', field: 'diasUteis', sortable: true }
      ]
    }
  },
  methods: {

  }
})
</script>
