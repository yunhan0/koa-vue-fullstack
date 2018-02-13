import HTTP from '../services/http-common';

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let UserResource = {
    get(id) { // Get a specific thing
        return HTTP.get('users/' + id);
    },

    create(body) {
        console.log(body);
        return HTTP.post('users/', body);
    }
};

export default UserResource;