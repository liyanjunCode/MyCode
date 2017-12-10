// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router-config.js'
import vuex from 'vuex'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(vuex)
const store = new vuex.Store({
  state : {
    count:0
  },
  addCartEl: {},
  mutations:{
    increment(state) {
      state.count++
    }
  }
})
const router =new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  data(){
    return{
      eventHub:new Vue()
    }
  },
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
