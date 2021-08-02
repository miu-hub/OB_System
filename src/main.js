import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.css'
import eleui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(eleui);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
