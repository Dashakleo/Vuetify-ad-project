import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home.vue'
import Ad from '@/components/ads/Ad.vue'
import AdList from '@/components/ads/AdList.vue'
import NewAd from '@/components/ads/NewAd.vue'
import Login from '@/components/auth/Login.vue'
import Registration from '@/components/auth/Registration.vue'
import Orders from '@/components/user/Orders.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Home,
      name: 'home'
    },
    {
      path: '/ad/:id',
      component: Ad,
      props: true,
      name: 'ad'
    },
    {
      path: '/list',
      component: AdList,
      name: 'list',
      beforeEnter: AuthGuard

    },
    {
      path: '/new',
      component: NewAd,
      name: 'newAd',
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/registration',
      component: Registration,
      name: 'reg'
    },
    {
      path: '/orders',
      component: Orders,
      name: 'orders',
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
