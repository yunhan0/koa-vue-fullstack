/**
 * Populate DB with sample data on server start
 */

'use strict';
const Thing = require('../api/thing/thing.model');
const User = require('../api/user/user.model');

const seeding = async() => {
    await Thing.collection.remove();
    await Thing.create(
        { name: 'Our first Koa and Node app', info: 'detailed info goes here' }, 
        { name: 'Mongoose is here', info: 'detailed info goes here' }
    );
    await User.collection.remove();
    await User.create({ email: 'test@example.com', password: 'helloworld' });
    console.log('Finish populating database');
}

seeding();