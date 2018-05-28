import AuthService from '../../api/auth.service';

export default {
    state: {
        user: null
    },
    getters: {
        isAuthenticated: state => {
            return !!state.user;
        },

        isAdmin: state => {
            return state.user.role === 'admin';
        },

        getCurrentUser: state => {
            return state.user;
        }
    },
    mutations: {
        LOGIN: (state, data) => {
            state.user = data;
        },
        LOGOUT: state => {
            state.user = null;
        }
    },
    actions: {
        login: ({ commit }, body) => {
            return AuthService.login(body)
            .then(user => {
                commit('LOGIN', user);
            })
            .catch(err => {
                throw err;
            });
        },

        logout: ({ commit }) => {
            localStorage.removeItem('token');
            commit('LOGOUT');
        },

        autoLogin: ({commit}, user) => {
            commit('LOGIN', user);
        },

        signup: ({ commit }, body) => {
            return AuthService.signup(body)
            .then(user => {
                commit('LOGIN', user);
            })
            .catch(err => {
                throw err;
            });
        },
    }
}