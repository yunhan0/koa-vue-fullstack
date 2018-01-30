import Vue from 'vue';
import App from './App.vue';
/** Router **/
import VueRouter from 'vue-router';
import Routes from './routes';

/** Partially import from Element UI **/
import {
    Container, Aside, Header, Footer, Main, Menu, Submenu, MenuItem, MenuItemGroup, 
    Button, Input, Form, FormItem
} from 'element-ui';

// i18n for Element UI
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

// configure language
locale.use(lang);

// Element UI components
Vue.prototype.$ELEMENT = { size: 'small', locale };
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);


/** Router **/
Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes
});

new Vue({
    el:'#app',
    render: h=>h(App),
    router: router
});