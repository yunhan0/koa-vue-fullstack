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
            err.status = err.status || 500;
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
            err.status = err.status || 500;
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
            err.status = err.status || 500;
            throw err;
        }
    })

    // update
    .put('/:id', (ctx, next) => {
        try {
            ctx.body = 'Thing update!'; 
        } catch(err) {
            err.status = err.status || 500;
            throw err;
        }
    })

    // delete
    .delete('/:id', async (ctx, next) => {
        try {
            let entity = await Thing.findById({_id: ctx.params.id});
            // Handle not found error
            if (!entity) { ctx.throw(404, "not found"); }
            // let ret = await entity.remove();
            // ctx.body = ret;
        } catch(err) {
            err.status = err.status || 500;
            throw err;
        }
    });

module.exports = router;