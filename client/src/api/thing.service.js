/**
 * GET      /api/things         -> index
 * POST     /api/things         -> create
 * GET      /api/things/:id     -> show
 * PUT      /api/things/:id     -> update
 * DELETE   /api/things/:id     -> delete
 */

import HTTP from './http-common'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let ThingResource = {
    show() { // Show all the things
        return HTTP.get('things')
            .then(response => {
                return response.data
            })
            .catch(err => {
                throw err
            })
    },

    get(id) { // Get a specific thing
        return HTTP.get('things/' + id)
            .then(response => {
                return response.data
            })
            .catch(err => {
                throw err
            })
    },

    create(body) { // Create a thing
        return HTTP.post('things', body)
            .then(response => {
                return response.data
            })
            .catch(err => {
                throw err
            })
    },

    delete(id) { // Delete a thing
        return HTTP.delete('things/' + id)
    },

    update(id, body) { // Update a thing
        return HTTP.put('things/' + id, body)
            .then(response => {
                return response.data
            })
            .catch(err => {
                throw err
            })
    }
}

export default ThingResource