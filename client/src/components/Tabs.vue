<template>
  <div class="cycle-perf">
    <ul class="nav nav-tabs" role="tablist">
      <li role="menu" class="active">
        <a href="#home" aria-controls="home" role="tab" data-toggle="tab" @click.prevent="reload">
          <span class="glyphicon glyphicon-blackboard"></span>
          <span class="hidden-sm hidden-xs">Tableau de bord</span>
        </a>
      </li>
      <li role="menu">
        <a href="#form" aria-controls="form" role="tab" data-toggle="tab" @click.prevent="reload">
          <span class="glyphicon glyphicon-calendar"></span>
          <span class="hidden-sm hidden-xs">Ajouter une session</span>
        </a>
      </li>
      <li role="menu">
        <a href="#sessions" aria-controls="sessions" role="tab" data-toggle="tab" @click.prevent="$emit('fetch-data')">
          <span class="glyphicon glyphicon-th-list"></span>
          <span class="hidden-sm hidden-xs">Mes sessions</span>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="home">
        <home></home>
      </div>
      <div role="tabpanel" class="tab-pane" id="form">
        <register></register>
      </div>
      <div role="tabpanel" class="tab-pane" id="sessions">
        <grid
          :headers="headers"
          :items="items"
          :totalCount="totalCount"
          :currentPage="currentPage"
          :totalPage="totalPage"
          :perPage="perPage"
          >
        </grid>
      </div>
    </div>
  </div>
</template>

<script>
import Home from '@/components/Home'
import Grid from '@/components/Grid'
import Register from '@/components/Register'
import toastr from 'toastr'
import baseUrl from '@/modules/base-url'

export default {
  name: 'Tabs',
  components: {
    Home,
    Register,
    Grid
  },
  data () {
    return {
      totalCount: 0,
      totalPage: 1,
      perPage: 10,
      firstPage: 1,
      currentPage: 1,
      items: [],
      headers: [
        {
          key: 'id',
          value: 'N°'
        },
        {
          key: 'date',
          value: 'Date de la sortie'
        },
        {
          key: 'duration',
          value: 'Durée'
        },
        {
          key: 'distance',
          value: 'Distance'
        },
        {
          key: 'speed_avg',
          value: 'Vitesse Moyenne'
        },
        {
          key: 'speed_max',
          value: 'Vitesse max'
        }
      ],
      baseUrl: baseUrl
    }
  },
  created () {
    this.initGrid()
  },
  mounted () {
    this.$on('fetch-data', () => this.fetchData())
    this.$on('per-page', page => {
      this.$set(this.$data, 'perPage', page)
      this.$set(this.$data, 'currentPage', 1)
      this.$set(this.$data, 'firstPage', (this.currentPage - 1) * this.perPage)
      this.fetchData()
    })
    this.$on('current-page', page => {
      this.$set(this.$data, 'currentPage', page)
      this.$set(this.$data, 'firstPage', (this.currentPage - 1) * this.perPage)
      this.fetchData()
    })
    window.eventManager.$on('reload-data', () => this.fetchData())
  },
  methods: {
    reload () {
      window.eventManager.$emit('clear-form')
      window.eventManager.$emit('reload-data')
    },
    initGrid () {
      this.$http.get(this.baseUrl + '/sessions/count').then(response => {
        this.$set(this.$data, 'totalCount', response.data.count)
        this.totalPage = Math.ceil(this.totalCount / this.perPage)
        this.$set(this.$data, 'firstPage', (this.currentPage - 1) * this.perPage)
      }, response => {
        toastr.error('Impossible de récupperer les données du serveur')
      })
    },
    fetchData () {
      this.initGrid()
      let filter = '?filter[limit]=' + this.perPage + '&filter[skip]=' + this.firstPage
      this.$http.get(this.baseUrl + '/sessions' + filter).then(response => {
        this.$set(this.$data, 'items', response.data)
      }, response => {
        toastr.error('Impossible de récupperer les données du serveur')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
