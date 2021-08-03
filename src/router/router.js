import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import layout from '../views/layout/layout.vue'

import conest from '../views/index/conest.vue'
import comment from '../views/index/comment.vue'
import fans from '../views/index/fans.vue'
import issue from '../views/index/issue.vue'
import matter from '../views/index/matter.vue'
import user from '../views/index/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    // name: 'layout',
    path: '/',
    component: layout,
    children: [{
      path: '',
      name: 'index',
      component: index
    }, {
      path: 'conest',
      name: 'conest',
      component: conest,
    }, {
      path: 'comment',
      name: 'comment',
      component: comment,
    }, {
      path: 'fans',
      name: 'fans',
      component: fans,
    }, {
      path: 'issue',
      name: 'issue',
      component: issue,
    }, {
      path: 'matter',
      name: 'matter',
      component: matter,
    }, {
      path: 'user',
      name: 'user',
      component: user,
    }
    ]
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
