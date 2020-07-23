import Vue from 'vue'
import App from './App.vue'

import {
  BIconXCircle,
  BIconFiles,
  ButtonPlugin,
  FormCheckboxPlugin,
  FormSelectPlugin,
  FormTextareaPlugin,
  LayoutPlugin,
  NavbarPlugin
} from 'bootstrap-vue'

import './styles/custom.scss';

Vue.config.productionTip = true

Vue.use(ButtonPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormSelectPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(LayoutPlugin)
Vue.use(NavbarPlugin)
Vue.component('BIconFiles', BIconFiles)
Vue.component('BIconXCircle', BIconXCircle)

new Vue({
  render: h => h(App),
}).$mount('#app')
