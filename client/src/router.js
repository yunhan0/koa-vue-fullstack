import Vue from 'vue';
/** Router **/
import VueRouter from 'vue-router';
/** Store **/
import store from './store/';

const Main = () => import(/* webpackChunkName: "group-main" */ './views/Main.vue');

/** Router **/
Vue.use(VueRouter);

let router = new VueRouter({
    /*
    * The default mode for vue-router is hash mode - it uses the URL hash to
    *  simulate a full URL so that the page won't be reloaded when the URL changes.
    * To get rid of the hash, we can use the router's history mode.
    */
    mode: 'history',
    routes: [
        { 
            path: '/login', 
            component: () => import(/* webpackChunkName: "group-account" */ './views/account/Login.vue'), 
            beforeEnter: (to, from, next) => {
                if (store.getters.isAuthenticated) {
                    next('/home');
                } else {
                    next();
                }
            } 
        },
        { 
            path: '/signup', 
            component: () => import(/* webpackChunkName: "group-account" */ './views/account/Signup.vue'),
            beforeEnter: (to, from, next) => {
                if (store.getters.isAuthenticated) {
                    next('/home');
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
                    component: () => import(/* webpackChunkName: "group-account" */ './views/admin/UserManagement.vue'), 
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