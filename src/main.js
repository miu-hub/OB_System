import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from '@/router/router.js'
// 引入全局样式
import './style/index.css'
// 引入element-ui库
import eleui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入字体图标库
import '@/style/download/font_2718970_6lv8wrmi1a7/iconfont.css'
// 引入vuex配置文件
import store from '@/store/store.js'

// 加载tiptap样式
import "element-tiptap/lib/index.css";

// 语法提示
Vue.config.productionTip = false

// 使用ui库
Vue.use(eleui);


new Vue({
  // 在vue实例上绑定router,store
  router,
  store,
  render: h => h(App),
  // 全局事件总线安装
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount('#app')
