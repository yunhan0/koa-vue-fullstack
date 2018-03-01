import Vue from 'vue';
import App from './App.vue';
/** Router **/
import router from './router';
/** Store **/
import store from './store/';
import AuthService from './api/auth.service';
/** Partially import from Element UI **/
import { Menu, Button, Input, Form, FormItem, Row, Col, Loading } 
from 'element-ui';

// i18n for Element UI
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

// configure language
locale.use(lang);

// Element UI components
Vue.prototype.$ELEMENT = { size: 'small', locale };
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Loading.directive);

function initialisation() {
    new Vue({
        el:'#app',
        router,
        store,
        render: h=>h(App)
    });
}

new Promise((resolve, reject) => {
    if (!!localStorage.getItem('token')) {
        AuthService.getCurrentUser()
        .then(user => {
            store.dispatch('autoLogin', user);
            resolve();
        })
    } else {
        resolve();
    }
}).then(() => {
    initialisation();
}).catch(err => {
    // still initialize the view if get user has error;
    initialisation();
});
