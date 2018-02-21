import HTTP from '../services/http-common';
import User from './user.service';

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let AuthService = {
    authenticated: false,

    login(body) {
        return HTTP.post('auth/login', body)
            .then(res => {
                this.authenticated = true;
                localStorage.setItem('token', res.data.token);
                return User.get();
            })
            .then(user => {
                return new Promise(resolve => { resolve(); });
            })
            .catch(err => {
                return new Promise(reject => { reject(err); });
            });
    },

    signup(body) {
        return User.create(body);
    },

    logout() {
        this.authenticated = false;
        localStorage.removeItem('token');
        // currentUser = {};
    },

    forget() {

    },

    reset() {

    }
};

export default AuthService;