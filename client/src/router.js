import Vue from 'vue'
/** Router **/
import VueRouter from 'vue-router'
/** Store **/
import store from './store/'

const Main = () => import(/* webpackChunkName: "group-main" */ './views/Main.vue')

/** Router **/
Vue.use(VueRouter)

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
                    next('/home')
                } else {
                    next()
                }
            }
        },
        {
            path: '/signup',
            component: () => import(/* webpackChunkName: "group-account" */ './views/account/Signup.vue'),
            beforeEnter: (to, from, next) => {
                if (store.getters.isAuthenticated) {
                    next('/home')
                } else {
                    next()
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
                    path: '/users',
                    name: 'Users',
                    component: () => import(/* webpackChunkName: "group-account" */ './views/admin/Users.vue'),
                    meta: {
                        requiresAuth: true, roles: ['admin']
                    }
                },
                {
                    path: '/things',
                    name: 'Things',
                    component: () => import(/* webpackChunkName: "group-home" */ './views/Things.vue'),
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    // If doesn't require authentication, accept.
    if (!to.meta.requiresAuth) {
        return next()
    }
    // If require auth but user is not authenticated, go to login.
    if (!store.getters.isAuthenticated) {
        return next('/login')
    }
    // If user is authenticated and page doesn't define roles, accept.
    if(!to.meta.roles) {
        return next()
    }
    // If page defines roles, check if user type is included in the roles.
    if (to.meta.roles.includes(store.getters.getCurrentUser.role)) {
        return next()
    }
    // Otherwise, denied.
    next('/')
})

export default router