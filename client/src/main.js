import Vue from 'vue';
import App from './App.vue';
/** Router **/
import VueRouter from 'vue-router';
import Routes from './routes';
/** Auth **/
import Auth from './services/auth.service';

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

/** Router **/
Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !Auth.authenticated) {
        next('/');
    } else {
        next();
    }
});

new Vue({
    el:'#app',
    render: h=>h(App),
    router: router
});