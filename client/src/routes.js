const Login = () => import(/* webpackChunkName: "group-login" */ './views/Login.vue');
const Home = () => import(/* webpackChunkName: "group-home" */ './views/Home.vue');
const Page1 = () => import(/* webpackChunkName: "group-page1" */ './views/Page1.vue');

export default [
    { path: '/', component: Login },
    { path: '/home', component: Home, meta: {requiresAuth: true }},
    { path: '/page1', component: Page1, meta: {requiresAuth: true }}
]