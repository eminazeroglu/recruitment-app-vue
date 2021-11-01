import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/*
* Component Register
* */
import "./plugins/components"
/*
* Mixin Register
* */
import './plugins/mixins'
/*
* Directive Register
* */
import './plugins/directive'
/*
* Third Party Register
* */
import "./plugins/third-party"
/*
* Property Register
* */
import "./plugins/property"
/*
 * Event Bus
 * */
import "./plugins/eventBus"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
