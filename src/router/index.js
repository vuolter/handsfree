import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/smile-tiles',
    name: 'SmileTiles',
    component: () =>
      import(/* webpackChunkName: "SmileTiles" */ '../views/SmileTiles.vue')
  },
  {
    path: '/youtube360',
    name: 'YouTube360',
    component: () =>
      import(/* webpackChunkName: "YouTube360" */ '../views/YouTube360.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
