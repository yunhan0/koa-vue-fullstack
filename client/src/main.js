import Vue from 'vue';
import App from './App.vue';
/** Router **/
import VueRouter from 'vue-router';
import Routes from './routes';

/** Element UI **/
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';

Vue.use(Element);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: Routes
});

new Vue({
    el:'#app',
    render: h=>h(App),
    router: router
});