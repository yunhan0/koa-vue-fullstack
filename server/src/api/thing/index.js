/**
 * GET      /api/things         -> index
 * POST     /api/things         -> create
 * GET      /api/things/:id     -> show
 * PUT      /api/things/:id     -> update
 * DELETE   /api/things/:id     -> delete
 */

'use strict';
const Router = require('koa-router');
var Thing = require('./thing.model');

let router = new Router({
	prefix: '/api/things'
});

router
    // index
    .get('/', async (ctx, next) => {
        try {
            ctx.body = await Thing.find({}, 'name');
        } catch(err) {
            throw err;
        }
    })

    // create
    .post('/', async (ctx, next) => {
        try {
            let newThing = await Thing.create(ctx.request.body);
            ctx.status = 201; // Status code 201 : created
            ctx.body = newThing;
        } catch(err) {
            throw err;
        }
    })

    // get single item
    .get('/:id', async (ctx, next) => {
        try {
            let entity = await Thing.findById({_id: ctx.params.id});
            // Handle not found error
            if (!entity) { ctx.throw(404, "not found"); }
            ctx.body = entity;
        } catch(err) {
            throw err;
        }
    })

    // update
    .put('/:id', (ctx, next) => {
        try {
            ctx.body = 'Thing update!'; 
        } catch(err) {
            throw err;
        }
    })

    // delete
    .delete('/:id', async (ctx, next) => {
        try {
            let entity = await Thing.findById({_id: ctx.params.id});
            // Handle not found error
            if (!entity) { ctx.throw(404, "not found"); }
            ctx.body = await entity.remove();
        } catch(err) {
            throw err;
        }
    });

module.exports = router;