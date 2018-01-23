/**
 * Populate DB with sample data on server start
 */

'use strict';
const Thing = require('../api/thing/thing.model');

const seeding = async() => {
    await Thing.collection.remove();
    await Thing.create(
        { name: 'Our first Koa and Node app', info: 'detailed info goes here' }, 
        { name: 'Mongoose is here', info: 'detailed info goes here' }
    );
    console.log('Finish populating database');
}

seeding();