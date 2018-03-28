/**
 * Entry file
 */

/*
 * should not use .env files in your production environment though 
 * and rather set the values directly on the respective host.
 * */
if (process.env.NODE_ENV !== 'production') {
    const config = require('dotenv').config()
    if (config.error) {
        throw config.error
    }
}
