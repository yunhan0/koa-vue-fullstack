import HTTP from '../services/http-common';
import User from './user.service';

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let AuthService = {
    login(body) {
        return HTTP.post('auth/login', body)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                return User.get();
            })
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw err;
            });
    },

    signup(body) {
        return User.create(body);
    },

    forget() {

    },

    reset() {

    },

    getCurrentUser() {
        return User.get().then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
    }
};

export default AuthService;