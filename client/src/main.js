import Vue from 'vue';
import App from './App.vue';
/** Router **/
import router from './routes';
/** Store **/
import store from './store/';
import Auth from './api/auth.service';
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

if (!!localStorage.getItem('token')) {
    Auth.getCurrentUser()
    .then(user => {
        store.dispatch('autoLogin', user); 
        new Vue({
            store,
            el:'#app',
            render: h=>h(App),
            router: router
        });  
    })
    .catch(err => {
        new Vue({
            store,
            el:'#app',
            render: h=>h(App),
            router: router
        });
    });
} else {
    new Vue({
        store,
        el:'#app',
        render: h=>h(App),
        router: router
    });
}
