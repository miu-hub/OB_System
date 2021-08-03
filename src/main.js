import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import './style/index.css'
import eleui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/download/font_2718970_6lv8wrmi1a7/iconfont.css'
Vue.config.productionTip = false
Vue.use(eleui);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
