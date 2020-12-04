import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import '@/assets/css/main.scss'
import Vuelidate from 'vuelidate'
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

// Init plugin

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(Vuelidate)
Vue.use(Loading);
Vue.use(VueSidebarMenu)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
