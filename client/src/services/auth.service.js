import HTTP from '../services/http-common';
import User from './user.service';

let currentUser = {};

if (localStorage.getItem('token')) {
    currentUser = {};
}

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let AuthService = {
    login(body) { // Create a thing
        return HTTP.post('auth/login', body);
    },

    signup(body) {
        return User.create(body);
    },

    logout() {
        localStorage.removeItem('token');
        currentUser = {};
    },

    forget() {

    },

    reset() {

    },

    getCurrentUser() {

    }
};

export default AuthService;