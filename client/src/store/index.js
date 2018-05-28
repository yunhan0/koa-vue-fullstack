import Vue from 'vue';
/** Vuex **/
import Vuex from 'vuex';
/** Modules **/
import auth from './modules/auth';
import things from './modules/things';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { auth, things }
});