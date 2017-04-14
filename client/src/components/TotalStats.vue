<template>
  <div class="">
    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <h2 class="panel-title">
          <span class="">Statistiques</span>
          <span class="glyphicon glyphicon-stats pull-right"></span>
        </h2>
      </div>
      <div class="table-responsive" v-if="items">
        <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <th>Distance totale parcourue</th>
              <td><var>{{ items.totalDistance }} km</var></td>
            </tr>
            <tr>
              <th>Durée totale</th>
              <td><var>{{ totalDuration }}</var></td>
            </tr>
            <tr>
              <th>Plus longue sortie</th>
              <td><var>{{ items.longuestSession }}</var></td>
            </tr>
            <tr>
              <th>Record vitesse max</th>
              <td><var>{{ items.speedMaxRecord }} km/h</var></td>
            </tr>
            <tr>
              <th>Record vitesse moyenne</th>
              <td><var>{{ items.speedAvgRecord }} km/h</var></td>
            </tr>
            <tr>
              <th>Vitesse moyenne générale</th>
              <td><var>{{ Number(items.generalAvgSpeed).toFixed(2) }} km/h</var></td>
            </tr>
            <tr>
              <th>Distance max effectué</th>
              <td><var>{{ items.distanceMax }} km</var></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="panel-body" v-else>
        <p class="alert alert-info">
          <span class="glyphicon glyphicon-info-sign"></span>
          Pas de sortie enregistrée pour le moment!
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TotalStats',
  props: ['items', 'totalDuration'],
  data () {
    return {
    }
  }
}
</script>

<style lang="css">
</style>
