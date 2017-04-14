// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import moment from 'moment'
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import Bus from './modules/bus'
import VeeValidate from 'vee-validate'
import messagesFr from './i18n/vee-validate.fr.js'
moment.locale('fr')
window.moment = moment
window.eventManager = Bus
const configValidation = {
  locale: 'fr',
  dictionary: {
    fr: {
      messages: messagesFr
    }
  }
}
// import router from './router'
//
import jQuery from 'jquery'
window.jQuery = window.$ = jQuery
require('bootstrap')

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VeeValidate, configValidation)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }
})
