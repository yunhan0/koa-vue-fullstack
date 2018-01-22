const Home = () => import(/* webpackChunkName: "group-chunk" */ './views/Home.vue');
const Page1 = () => import(/* webpackChunkName: "group-chunk" */ './views/Page1.vue');

export default [
    { path: '/', component: Home },
    { path: '/page1', component: Page1 }
]