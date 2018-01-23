const Home = () => import(/* webpackChunkName: "group-home" */ './views/Home.vue');
const Page1 = () => import(/* webpackChunkName: "group-page1" */ './views/Page1.vue');

export default [
    { path: '/', component: Home },
    { path: '/page1', component: Page1 }
]