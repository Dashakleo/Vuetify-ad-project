import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'

import BuyModalComponent from './components/Shared/BuyModal'

Vue.use(Vuetify, {
  theme: {
    primary: '#AB47BC'
  }
})
Vue.component('app-buy-modal', BuyModalComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCN5mfSiqTjNNrDvMuZVgRNZsD9ICpAqCw',
      authDomain: 'ohiko-ads.firebaseapp.com',
      databaseURL: 'https://ohiko-ads.firebaseio.com',
      projectId: 'ohiko-ads',
      storageBucket: 'ohiko-ads.appspot.com',
      messagingSenderId: '14459638856'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
