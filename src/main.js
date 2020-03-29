// Dependencies
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import { VueSpinners } from '@saeris/vue-spinners'

// App
import App from '@/App.vue'

// Service worker
import '@/registerServiceWorker'

// Styles
import '@/assets/styles.scss'

// Routes
import router from '@/router'

// Filters
import { dolarFilter, percentFilter } from '@/utils/filters'

Vue.use(VueApexCharts)
Vue.use(VueSpinners)
Vue.filter('dolar', dolarFilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
