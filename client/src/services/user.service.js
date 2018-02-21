import HTTP from '../services/http-common';

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let UserResource = {
    get() { // Get current user
        return HTTP.get('users/me');
    },

    create(body) {
        return HTTP.post('users/', body);
    }
};

export default UserResource;