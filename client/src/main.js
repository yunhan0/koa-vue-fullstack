import Vue from 'vue';
import App from './App.vue';
/** Router **/
import router from './router';
/** Store **/
import store from './store/';
import AuthService from './api/auth.service';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

function initialisation() {
    new Vue({
        el:'#app',
        router,
        store,
        render: h=>h(App)
    });
}

(function () {
    if (!!localStorage.getItem('token')) {
        return AuthService.getCurrentUser()
        .then(user => {
            store.dispatch('autoLogin', user);
            initialisation();
        })
        .catch(err => {
            initialisation();
        })
    } else {
        initialisation();
    }
})();