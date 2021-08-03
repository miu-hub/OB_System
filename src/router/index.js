import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    name: 'index',
    path: '/',
    component: index
  },
  {
    name: 'login',
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
