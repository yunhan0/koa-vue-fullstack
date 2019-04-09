import Vue from 'vue'
import App from './App.vue'
/** Router **/
import router from './router'
/** Store **/
import store from './store/'
// api
import AuthService from './api/auth.service'
import HTTP from './api/http-common'
/** Style **/
import './styles/index.less'
/** iView **/
import { Button, Input, Row, Col, Card, Message, locale } from 'iview'
// Configure iView language
import lang from 'iview/dist/locale/en-US'
locale(lang)
/*
 * Import iView on demand, below is generally used components.
 */
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Card', Card)
Vue.prototype.$Message = Message

function initialisation() {
  new Vue({
    el:'#app',
    router,
    store,
    render: h=>h(App)
  })
}

/*
 * Add HTTP response interceptor
 * Should not put into the api/http-common.js,
 * it will raise a Circular dependency error 
 */
HTTP.interceptors.response.use(function (response) {
  return response
}, function(error) {
  if (error.response.status === 401) {
    store.dispatch('logout')
    router.push('/login')
  }
  return Promise.reject(error.response.data)
})

if (localStorage.getItem('token')) {
  AuthService.getCurrentUser()
    .then(user => {
      store.dispatch('autoLogin', user)
      initialisation()
    })
    /*eslint no-unused-vars: ["error", {"args": "none"}]*/
    .catch(err => {
      initialisation()
    })
} else {
  initialisation()
}
