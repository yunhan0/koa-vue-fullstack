import AuthService from '../../api/auth.service';
import router from '../../router';

export default {
    state: {
        user: null
    },
    getters: {
        isAuthenticated: state => {
            return !!state.user;
        },

        getCurrentUser: state => {
            return state.user;
        }
    },
    mutations: {
        login: (state, data) => {
            state.user = data;
        },
        logout: state => {
            state.user = null;
        }
    },
    actions: {
        login: ({ commit }, body) => {
            return AuthService.login(body)
            .then(user => {
                commit('login', user);
                router.push('/home');
            })
            .catch(err => {
                console.log(err);
            });
        },

        logout: ({ commit }) => {
            localStorage.removeItem('token');
            commit('logout');
            router.push('/');
        },

        autoLogin: ({commit}, user) => {
            commit('login', user);
        }
    }
}