/**
 * GET      /api/things         -> index
 * POST     /api/things         -> create
 * GET      /api/things/:id     -> show
 * PUT      /api/things/:id     -> update
 * DELETE   /api/things/:id     -> delete
 */

'use strict'
const Router = require('koa-router')
var Thing = require('./thing.model')

let router = new Router({
  prefix: '/api/things'
})

router
// index
  .get('/', async (ctx) => {
    try {
      ctx.body = await Thing.find({})
    } catch(err) {
      throw err
    }
  })

// create
  .post('/', async (ctx) => {
    try {
      let newThing = await Thing.create(ctx.request.body)
      ctx.status = 201 // Status code 201 : created
      ctx.body = newThing
    } catch(err) {
      throw err
    }
  })

// get single item
  .get('/:id', async (ctx) => {
    try {
      let entity = await Thing.findById({_id: ctx.params.id})
      // Handle not found error
      if (!entity) { ctx.throw(404, 'not found') }
      ctx.body = entity
    } catch(err) {
      throw err
    }
  })

// update single item
  .put('/:id', async (ctx) => {
    try {
      let entity = await Thing.findByIdAndUpdate(ctx.params.id,
        { $set: ctx.request.body },
        /*
         * new: bool - true to return the modified document rather
         * than the original. defaults to false
         */
        { new: true }
      )
      // Handle not found error
      if (!entity) { ctx.throw(404, 'not found') }
      ctx.body = entity
    } catch(err) {
      throw err
    }
  })

// delete
  .delete('/:id', async (ctx) => {
    try {
      let entity = await Thing.findById({_id: ctx.params.id})
      // Handle not found error
      if (!entity) { ctx.throw(404, 'not found') }
      ctx.body = await entity.remove()
    } catch(err) {
      throw err
    }
  })

module.exports = router
