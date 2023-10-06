<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
// '#E46651', '#00D8FF'

export default {
  name: 'BarChart',
  props: ['data'],
  components: { Bar },
  data () {
    return {
      chartData: {
        labels: ['Meta Total'],
        datasets: [
          {
            data: [0],
            label: 'Total Vendas',
            backgroundColor: '#00D8FF'
          },
          {
            data: [0],
            label: 'Total Geral',
            backgroundColor: '#41B883'
          },
          {
            data: [0],
            label: 'Total Cancelamentos',
            backgroundColor: '#E46651'
          }

        ]
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {

            grid: {
              offset: true
            }
          },
          y: {
            stacked: false
          }
        }
      }
    }
  },
  watch: {
    data (novaData) {
      console.log('aqui')
      console.log(novaData)
      this.chartData = {
        labels: ['Metas Total'],
        datasets: [
          {
            data: [novaData.totalVendas],
            label: 'Vendas',
            backgroundColor: '#00D8FF'
          },
          {
            data: [novaData.totalGeral],
            label: 'Geral',
            backgroundColor: '#41B883'
          },
          {
            data: [novaData.totalCancelamentos],
            label: 'Cancelamentos',
            backgroundColor: '#E46651'
          }

        ]
      }
    }
  }
}
</script>
