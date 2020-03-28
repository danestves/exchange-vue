import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/styles.scss'

import router from '@/router'

// Filters
import { dollarFilter, percentFilter } from '@/utils/filters'

Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
