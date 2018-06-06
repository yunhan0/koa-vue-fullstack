import Vue from 'vue'
import App from './App.vue'
/** Router **/
import router from './router'
/** Store **/
import store from './store/'
import AuthService from './api/auth.service'
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

(function () {
  if (localStorage.getItem('token')) {
    return AuthService.getCurrentUser()
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
})()