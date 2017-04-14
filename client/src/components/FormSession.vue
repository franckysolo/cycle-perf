<template>
  <form id="form-session" class="form-horizontal"  @submit.prevent="validateBeforeSubmit">
    <input id="id" type="hidden" name="id" class="" :value="id">
    <div class="form-group" :class="{ 'has-error': errors.has('date') }">
      <label for="date" class="col-sm-4 control-label">Date</label>
      <div class="col-sm-8">
        <vue-picker
          mode="date"
          :labels="months"
          :nextTips="nextTips"
          :prevTips="prevTips"
          inputName="date">
        </vue-picker>
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('duration') }">
      <label for="duration" class="col-sm-4 control-label">Durée</label>
      <div class="col-sm-8">
        <input type="text" name="duration" id="duration" v-model="duration"
        v-validate.initial data-vv-rules="required|regex:^[\d]{2}:[\d]{2}:[\d]{2}$" data-vv-as="La durée de la sortie"
        class="form-control" placeholder="Durée au format 00:00:00">
        <em class="text-danger" v-if="errors.has('duration')">
          {{ errors.first('duration') }}
        </em>
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('distance') }">
      <label for="distance" class="col-sm-4 control-label">Distance</label>
      <div class="col-sm-8">
        <input type="text" name="distance" id="distance" v-model="distance"
        v-validate data-vv-rules="required|decimal:2" data-vv-as="La distance de la sortie"
        class="form-control" placeholder="Distance au format 00.00">
        <em class="text-danger" v-if="errors.has('distance')">
          {{ errors.first('distance') }}
        </em>
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('speed_avg') }">
      <label for="speed_avg" class="col-sm-4 control-label">Vitesse Moyenne</label>
      <div class="col-sm-8">
        <input type="text" name="speed_avg" id="speed_avg" v-model="speed_avg"
        v-validate data-vv-rules="required|decimal:2" data-vv-as="La vitesse moyenne"
        class="form-control" placeholder="Vitesse Moyenne au format 00.00">
        <em class="text-danger" v-if="errors.has('speed_avg')">
          {{ errors.first('speed_avg') }}
        </em>
      </div>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.has('speed_max') }">
      <label for="speed_max" class="col-sm-4 control-label">Vitesse Max</label>
      <div class="col-sm-8">
        <input type="text" name="speed_max" id="speed_max" v-model="speed_max"
        v-validate data-vv-rules="required|decimal:2" data-vv-as="La vitesse max"
        class="form-control" placeholder="Vitesse Max au format 00.00">
        <em class="text-danger" v-if="errors.has('speed_max')">
          {{ errors.first('speed_max') }}
        </em>
      </div>

    </div>
    <div class="form-group text-right">
      <div class="col-sm-6">
        <p class="logo">
          <img alt="Logo" src="../assets/img/picto-velo.png" width="50" height="25"  class="img-responsive">
        </p>
      </div>
      <div class="col-sm-6">
        <button class="btn btn-primary btn-submit" type="submit">
          Enregistrer
        </button>
      </div>
    </div>
    <div class="clearfix">&nbsp;</div>
    <div id="flash-message"></div>
  </form>
</template>

<script>
// import $ from 'jquery'
import toastr from 'toastr'
import VuePicker from '@/components/vue-picker'
import baseUrl from '@/modules/base-url'

export default {
  name: 'FormSession',
  components: {
    VuePicker
  },
  data () {
    return {
      months: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      nextTips: 'Suivant',
      prevTips: 'Précédent',
      baseUrl: baseUrl,
      id: '',
      date: '',
      duration: '',
      distance: '',
      speed_avg: '',
      speed_max: ''
    }
  },
  mounted () {
    window.eventManager.$on('clear-form', () => this.resetForm())
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(() => {
        let session = {
          date: this.date,
          duration: this.duration,
          distance: this.distance,
          speed_avg: this.speed_avg,
          speed_max: this.speed_max
        }
        if (this.id !== '') {
          session.id = this.id
        }
        this.$http.post(this.baseUrl + '/sessions', session)
        .then(response => {
          // success callback
          toastr.success('Votre session a bien été enregistrée', 'Informations')
          this.resetForm()
        }, response => {
          toastr.error('Une erreur est survenue', 'Erreur')
        })
      }).then(() => {
        // setTimeout(() => this.errors.clear(), 50)
        window.eventManager.$emit('reload-data')
      }).catch((e) => {
        console.log(e)
      })
    },
    resetForm () {
      this.id = ''
      this.date = ''
      this.duration = ''
      this.distance = ''
      this.speed_avg = ''
      this.speed_max = ''
      setTimeout(() => this.errors.clear(), 50)
    }
  }
}
</script>

<style lang="less">

</style>
