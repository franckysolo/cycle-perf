<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h2 class="panel-title">Nombres de sortie par Année</h2>
    </div>
    <div id="graph" class="panel-body">
      <pre class="hide">
        {{ items }}
      </pre>
      <canvas id="canvas-a" height="200"></canvas>

    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Chart from 'chart.js'
export default {
  name: 'Chart',
  props: ['items', 'labels'],
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    setTimeout(() => this.loadChart(), 150)
    var self = this
    window.eventManager.$on('reload-data', () => {
      setTimeout(() => self.loadChart(), 150)
    })
  },
  methods: {
    loadChart () {
      let ctx = $('#canvas-a').get(0).getContext('2d')
      let options = {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            data: this.items,
            label: 'Nombre de sortie vélo',
            backgroundColor: 'rgba(151, 187, 205, 0.2)'
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      }
      if (this.chart) {
        this.chart.destroy()
      }
      this.chart = new Chart(ctx, options)
      this.chart.update()
    }
  }
}
</script>

<style lang="less">
#canvas-a {
  width: 100%;
  max-height: 230px;
}
</style>
