<template>
  <q-page padding>
    <h4>Minhas vendas</h4>
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-6">
        <bar-chart />
      </div>

      <div class="col-xs-12 col-sm-4 col-md-6">
        <pie-chart />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarChart from 'src/components/BarChart.vue'
import PieChart from 'src/components/PieChart.vue'

export default defineComponent({
  // name: 'PageName'
  components: {
    BarChart,
    PieChart
  }
})
</script>
