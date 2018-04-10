import Vue from 'vue';
/** Router **/
import VueRouter from 'vue-router';
/** Store **/
import store from './store/';
const Login = () => import(/* webpackChunkName: "group-login" */ './views/Login.vue');
const Home = () => import(/* webpackChunkName: "group-home" */ './views/Home.vue');
const Settings = () => import(/* webpackChunkName: "group-settings" */ './views/Settings.vue');
const Page1 = () => import(/* webpackChunkName: "group-pages" */ './views/Page1.vue');
const Page2 = () => import(/* webpackChunkName: "group-pages" */ './views/Page2.vue')

/** Router **/
Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        { 
            path: '/', 
            component: Login, 
            beforeEnter: (to, from, next) => {
                if (store.getters.isAuthenticated) {
                    next('/home')
                } else {
                    next();
                }
            } 
        },
        { path: '/home', component: Home, meta: {requiresAuth: true }},
        { path: '/settings', component: Settings, meta: {requiresAuth: true }},
        { path: '/page1', component: Page1, meta: {requiresAuth: true }},
        { path: '/page2', component: Page2, meta: {requiresAuth: true }}
    ]
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;