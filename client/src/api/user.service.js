import HTTP from './http-common';

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let UserResource = {
    show() { // Show all the users
        return HTTP.get('users/');
    },

    get() { // Get current user
        return HTTP.get('users/me');
    },
    
    create(body) {
        return HTTP.post('users/', body);
    },

    createByAdmin(body) {
        return HTTP.post('users/signupByAdmin', body);
    },
};

export default UserResource;