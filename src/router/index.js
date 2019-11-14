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
  },
  {
    path: '/emojify',
    name: 'Emojify',
    component: () =>
      import(/* webpackChunkName: "Emojify" */ '../views/Emojify.vue')
  },
  {
    path: '/1st-person',
    name: '1stPerson',
    component: () =>
      import(/* webpackChunkName: "1stPerson" */ '../views/1stPerson.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
