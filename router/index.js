import Vue from 'vue'
import Router from 'vue-router'
Home = () => import('@/view/index')
Login = () => import('@/view/login/index')
// import Page404 from '@/view/page404/index'
Vue.use(Router)

const routers = new Router({
  // mode: 'history', // require service support
  // base: process.env.MIX_LARAVUE_PATH,
  // history: true,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
    // {
    //   path: '/*',
    //   name: 'page404',
    //   component: Page404
    // }
  ]
})

export default routers
