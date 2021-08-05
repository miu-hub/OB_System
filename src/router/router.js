import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from '../views/login/login.vue'
import index from '../components/index/index.vue'
import layout from '../views/layout/layout.vue'

import conest from '../components/conest/conest.vue'
import comment from '../components/comment/comment.vue'
import fans from '../components/fans/fans.vue'
import issue from '../components/issue/issue.vue'
import matter from '../components/matter/matter.vue'
import user from '../components/user/user.vue'

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

router.beforeEach((to, from, next) => {

  let user = localStorage.getItem('token');
  if (!user) {
    if (to.path == '/' || to.path == '/login') {
      next()
    } else {
      alert('未登录用户无权限查看此项！---请先登录');
    }
  } else {
    next();
  }
});
export default router
