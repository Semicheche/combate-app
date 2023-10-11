<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, LineController } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, PointElement, LineElement, LineController)
// '#E46651', '#00D8FF'

export default {
  name: 'BarChart',
  props: ['data', 'options'],
  components: { Bar },
  data () {
    return {
      chartData: {
        labels: ['Meta Total'],
        datasets: [
          {
            data: [0],
            label: '-',
            backgroundColor: '#00D8FF'
          },
          {
            data: [0],
            label: '-',
            backgroundColor: '#41B883'
          },
          {
            data: [0],
            label: '-',
            backgroundColor: '#E46651'
          }

        ]
      },
      chartOptions: {}
    }
  },
  watch: {
    data (novaData) {
      this.chartData = novaData
    },
    options (novoOpt) {
      this.chartOptions = novoOpt
    }
  }
}
</script>
