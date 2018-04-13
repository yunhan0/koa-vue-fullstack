import Vue from 'vue';
/** Router **/
import VueRouter from 'vue-router';
/** Store **/
import store from './store/';

const Main = () => import(/* webpackChunkName: "group-main" */ './views/Main.vue');

/** Router **/
Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        { 
            path: '/login', 
            component: () => import(/* webpackChunkName: "group-account" */ './views/account/Login.vue'), 
            beforeEnter: (to, from, next) => {
                if (store.getters.isAuthenticated) {
                    next('/home')
                } else {
                    next();
                }
            } 
        },
        {
            path: '/',
            redirect: '/home',
            component: Main, 
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    component: () => import(/* webpackChunkName: "group-home" */ './views/Home.vue'), 
                    meta: {
                        requiresAuth: true 
                    }
                },
                { 
                    path: '/settings',
                    name: 'Settings',
                    component: () => import(/* webpackChunkName: "group-account" */ './views/account/Settings.vue'), 
                    meta: {
                        requiresAuth: true
                    }
                },
                { 
                    path: '/user-management',
                    name: 'User Management',
                    component: () => import(/* webpackChunkName: "group-account" */ './views/account/UserManagement.vue'), 
                    meta: {
                        requiresAuth: true
                    }
                },                
                { 
                    path: '/page1',
                    name: 'Page1',
                    component: () => import(/* webpackChunkName: "group-pages" */ './views/Page1.vue'), 
                    meta: {
                        requiresAuth: true 
                    }
                },
                { 
                    path: '/page2',
                    name: 'Page2',
                    component: () => import(/* webpackChunkName: "group-pages" */ './views/Page2.vue'), 
                    meta: {
                        requiresAuth: true 
                    }
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;