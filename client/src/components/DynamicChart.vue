<template>
  <div class="panel panel-default">
  	<div class="panel-heading">
  		<h2 class="panel-title clearfix">
  			<span class="glyphicon glyphicon-graphs"></span>
  			<span class="col-sm-2 pull-right">
  				<select data-id="graph-b" name="year" v-model="year" class="form-control input-sm selector" @change="selectYear">
            <option disabled value="">Séléctionner une année</option>
            <option v-for="label in labels" :value="label">{{ label }}</option>
          </select>
  			</span>
  		</h2>
  	</div>
  	<div class="panel-body">
  		<div id="graph-b">
  			<h3 class="h4">Distance parcourue sur durée <span class="dis-year"></span></h3>
  			<canvas id="canvas-b" height="222" width="800" :items="distanceData"></canvas>
  		</div>
  		<h3 class="h4">Vitesse moyenne et max <span class="dis-year"></span></h3>
  		<div id="graph-c">
  			<canvas id="canvas-c" height="222" width="800" :labels="durationLabels"></canvas>
  		</div>
  	</div>
  </div>
</template>

<script>
import moment from 'moment'
import $ from 'jquery'
import Chart from 'chart.js'
import toastr from 'toastr'
import baseUrl from '@/modules/base-url'
export default {
  name: 'DynamicChart',
  props: ['labels'],
  data () {
    return {
      baseUrl: baseUrl,
      items: [],
      distanceData: [],
      durationLabels: [],
      graphLabels: [],
      speedMaxData: [],
      speedAvgData: [],
      year: null,
      charts: []
    }
  },
  mounted () {
    setTimeout(() => this.selectYear(), 100)
    window.eventManager.$on('reload-data', () => {
      setTimeout(() => this.selectYear(), 100)
    })
  },
  methods: {
    reset () {
      this.items = []
      this.distanceData = []
      this.durationLabels = []
      this.graphLabels = []
      this.speedMaxData = []
      this.speedAvgData = []
    },
    getFilter () {
      this.year = this.year === null ? this.labels[0] : this.year
      return {
        'date': {
          'regexp': this.year
        }
      }
    },
    selectYear () {
      this.reset()
      let where = this.getFilter()
      this.loadDynChart(where)
    },
    loadDynChart (where) {
      let url = this.baseUrl + '/sessions'
      url += encodeURI('?filter={"where":{"date":{"regexp": "' + this.year + '"}}}')
      this.$http.get(url).then(response => {
        this.$set(this.$data, 'items', response.body)
      }, response => {
        toastr.error('Impossible de récupperer les données du serveur')
      }).then(() => {
        this.items.forEach((item) => {
          this.distanceData.push(item.distance)
          this.durationLabels.push(item.duration)
          this.graphLabels.push(moment(item.date).format('DD/MM/YYYY'))
          this.speedMaxData.push(item.speed_max)
          this.speedAvgData.push(item.speed_avg)
        })
      }).then(() => {
        setTimeout(() => this.loadChartLine('#canvas-b', 'Distance parcourue (Km)'), 100)
      }).then(() => {
        setTimeout(() => this.loadCharts('#canvas-c'), 100)
      })
    },
    loadChartLine (id, title) {
      let datasets = [{
        label: title,
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        backgroundColor: 'rgba(151,187,205,0.2)',
        borderColor: 'rgba(151,187,205,1)',
        pointHoverBackgroundColor: 'rgba(187,0,0,1)',
        pointHoverBorderColor: 'rgba(187,0,0,1)',
        pointHoverRadius: 5,
        borderWidth: 0.2,
        data: this.distanceData
      }]
      this.drawChart(this.durationLabels, id, 'line', datasets)
    },
    loadCharts (id) {
      var datasets = [
        {
          label: 'Vitesse Max (km/H)',
          scaleTitle: 'KM/H',
          data: this.speedMaxData,
          backgroundColor: 'rgba(220,220,220,0.2)'
        },
        {
          label: 'Vitesse Moyenne (km/H)',
          scaleTitle: 'KM/H',
          data: this.speedAvgData,
          backgroundColor: 'rgba(20,220,220,0.2)'
        }
      ]

      this.drawChart(this.graphLabels, id, 'line', datasets)
    },
    drawChart (labels, id, type, datasets) {
      let ctx = $(id).get(0).getContext('2d')
      let options = {
        type: type,
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [],
            yAxes: []
          }
        }
      }
      if (this.charts[id]) {
        this.charts[id].destroy()
      }
      this.charts[id] = new Chart(ctx, options)
      this.charts[id].update()
    }
  }
}
</script>

<style lang="less">
#canvas {
  &-b,&-c {
    height: 222px;
  }
}
</style>
