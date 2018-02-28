import Vue from 'vue';
/** Router **/
import VueRouter from 'vue-router';
/** Store **/
import store from './store/';
const Login = () => import(/* webpackChunkName: "group-login" */ './views/Login.vue');
const Home = () => import(/* webpackChunkName: "group-home" */ './views/Home.vue');
const Page1 = () => import(/* webpackChunkName: "group-page1" */ './views/Page1.vue');

/** Router **/
Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        { 
            path: '/', 
            component: Login, 
            beforeEnter: (to, from, next) => {
                if (!store.getters.isAuthenticated) {
                    store.dispatch('init').then(() => {
                        if (store.getters.isAuthenticated) {
                            next('/home');
                        } else {
                            next('/');
                        }
                    }).catch(err => {
                        next('/');
                    });
                }
            } 
        },
        { path: '/home', component: Home, meta: {requiresAuth: true }},
        { path: '/page1', component: Page1, meta: {requiresAuth: true }}
    ]
});

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        next();
    } else {
        if (store.getters.isAuthenticated) {
            next();
        } else {
            store.dispatch('init').then(() => {
                if (store.getters.isAuthenticated) {
                    next();
                } else {
                    next('/');
                }
            }).catch(err => {
                next('/');
            });
        }
    }
});

export default router;