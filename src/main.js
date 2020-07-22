import Vue from 'vue'
import App from './App.vue'

import {
  BIconXCircle,
  BIconFiles,
  ButtonPlugin,
  FormCheckboxPlugin,
  FormTextareaPlugin,
  LayoutPlugin,
  NavbarPlugin
} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

Vue.config.productionTip = true

Vue.use(ButtonPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(LayoutPlugin)
Vue.use(NavbarPlugin)
Vue.component('BIconFiles', BIconFiles)
Vue.component('BIconXCircle', BIconXCircle)

new Vue({
  render: h => h(App),
}).$mount('#app')
