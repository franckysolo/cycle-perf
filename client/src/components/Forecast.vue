<template>
  <div class="panel panel-default">
  	<div class="panel-heading">
  		<h2 class="panel-title">
  			Condition Météo du jour
  		</h2>
  	</div>
  	<div class="panel-body">
  		<div class="row">
  			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <img alt="Météo Jour" :src="icon"  class="img-responsive center-block">
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <img alt="Météo Nuit" :src="moonIcon"  class="img-responsive center-block">
        </div>
      </div>
    </div>
    <div class="table-responsive">
		<table id="forecast" class="table table-bordered table-striped table-condensed small">
      <tbody>
  			<tr>
  				<th colspan="2">Lever du soleil</th>
  				<th colspan="2">Coucher du soleil</th>
  			</tr>
  			<tr class="text-center">
  				<td colspan="2">{{ sunr }}</td>
  				<td colspan="2">{{ suns }}</td>
  			</tr>
  			<tr>
  				<th>Temps</th>
  				<th>Température</th>
  				<th>Température ressentie</th>
  				<th>Température de rosée</th>
  			</tr>
  			<tr class="text-center">
  				<td>{{ t }}</td>
  				<td>{{ tmp }}°</td>
  				<td>{{ flik }}°</td>
  				<td>{{ dewp }}°</td>
  			</tr>
  			<tr>
  				<th>Vitesse du vent</th>
  				<th>Rafale</th>
  				<th>Direction en °</th>
  				<th>Direction</th>
  			</tr>
  			<tr class="text-center">
  				<td>{{ wind.s }} km/h</td>
  				<td>{{ wind.gust }} km/h</td>
  				<td>{{ wind.d }}°</td>
  				<td>{{ wind.t }}</td>
  			</tr>
  			<tr>
  				<th colspan="2">Humidité</th>
  				<th colspan="2">Visibilité</th>
  			</tr>
  			<tr class="text-center">
  				<td colspan="2">{{ hmid }}%</td>
  				<td colspan="2">{{ vis }}</td>
  			</tr>
  			<tr>
  				<th>Pression atmosphérique</th>
  				<th>Tendance de la pression</th>
  				<th>UV</th>
  				<th>Indice UV</th>
  			</tr>
  			<tr class="text-center">
  				<td>{{ bar.r }} hPa</td>
  				<td>{{ bar.d }}</td>
  				<td>{{ uv.i }}</td>
  				<td>{{ uv.t }}</td>
  			</tr>
      </tbody>
		</table>
	</div>
	<div class="panel-footer">
		Météo : {{ dnam }}
	</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'http://www.forecast.local/',
      icon: require('../assets/img/meteo/25.png'),
      moonIcon: require('../assets/img/meteo/25.png'),
      dnam: '',
      hmid: '',
      vis: '',
      t: '',
      tmp: '',
      flik: '',
      dewp: '',
      suns: '',
      sunr: '',
      wind: {
        s: '',
        gust: '',
        d: '',
        t: ''
      },
      bar: {
        r: '',
        d: ''
      },
      uv: {
        i: '',
        t: ''
      }
    }
  },
  mounted () {
    this.loadForecast()
  },
  methods: {
    loadForecast () {
      this.$http.get(this.url).then(response => {
        let rs = response.data
        this.dnam = rs.loc.dnam
        this.suns = rs.loc.suns
        this.sunr = rs.loc.sunr
        this.hmid = rs.cc.hmid
        this.dewp = rs.cc.dewp
        this.vis = rs.cc.vis
        this.flik = rs.cc.flik
        this.tmp = rs.cc.tmp
        this.t = rs.cc.t
        this.icon = require('../assets/img/meteo/' + rs.cc.icon + '.png')
        this.moonIcon = require('../assets/img/meteo/' + rs.cc.moon.icon + '.png')
        this.bar.r = rs.cc.bar.r
        this.bar.d = rs.cc.bar.d
        this.uv.i = rs.cc.uv.i
        this.uv.t = rs.cc.uv.t
        this.wind.s = rs.cc.wind.s
        this.wind.gust = rs.cc.wind.gust
        this.wind.d = rs.cc.wind.d
        this.wind.t = rs.cc.wind.t
      }, response => {
        console.error('Forecast', response)
      })
    }
  }
}
</script>

<style lang="less">
#forecast {
  td {
    font-size: large;
    font-weight: bold;
  }
}
</style>
