<template>
  <div>
    <div class="row mt-32">
       <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
         <total-stats :items="totalStats" :totalDuration="totalDuration">
         </total-stats>
       </div>
       <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
         <chart :labels="years" :items="sessionsByYearData"></chart>
       </div>
    </div>
    <dynamic-chart :labels="years"></dynamic-chart>
  </div>
</template>
<script>
import TotalStats from '@/components/TotalStats'
import Chart from '@/components/Chart'
import DynamicChart from '@/components/DynamicChart'
import filterDuration from '@/mixins/duration'
import baseUrl from '@/modules/base-url'
import toastr from 'toastr'
import $ from 'jquery'

export default {
  name: 'HomePage',
  mixins: [filterDuration],
  components: {
    TotalStats,
    DynamicChart,
    Chart
  },
  data () {
    return {
      baseUrl: baseUrl,
      totalDuration: '',
      totalStats: {},
      sessionsByYearData: [],
      years: []
    }
  },
  mounted () {
    this.getSessionByYear()
    window.eventManager.$on('reload-data', () => {
      this.getSessionByYear()
    })
  },
  methods: {
    getTotalStats () {
      var url = this.baseUrl + '/sessions/stats'
      this.totalStats = []
      this.$http.get(url).then(response => {
        this.$set(this.$data, 'totalStats', response.data.stats)
      }, response => {
        toastr.error('Impossible de récupperer les données pour les graphiques du serveur')
      }).then(() => {
        this.getTotalDuration()
      })
    },
    getTotalDuration () {
      var url = this.baseUrl + '/sessions'
      url += encodeURI('?filter={"fields":"duration"}')
      this.$http.get(url).then(response => {
        let array = response.body
        this.$set(this.$data, 'totalDuration', this.humanize(array))
      }, response => {
        toastr.error('Impossible de récupperer les durées de sortie pour les graphiques du serveur')
      })
    },
    getSessionByYear () {
      var url = this.baseUrl + '/sessions/countByYear'
      this.sessionsByYearData = []
      this.years = []
      this.$http.get(url).then(response => {
        this.prepareArray(response.data.countByYear)
      }, response => {
        toastr.error('Impossible de récupperer les données pour les graphiques du serveur')
      }).then(() => {
        this.getTotalStats()
      })
    },
    prepareArray (items) {
      $.each(items, (index, item) => {
        // console.info(item)
        this.sessionsByYearData.push(item.count)
        this.years.push(item._id.year)
      })
    }
  }
}
</script>

<style lang="less">
</style>
