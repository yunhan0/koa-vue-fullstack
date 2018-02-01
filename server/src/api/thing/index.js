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
            ctx.throw(500, err);
        }
    })

    // create
    .post('/', async (ctx, next) => {
        try {
            let newThing = await Thing.create(ctx.request.body);
            ctx.status = 201; // Status code 201 : created
            ctx.body = newThing;
        } catch(err) {
            ctx.throw(500, err);
        }
    })

    // get single item
    .get('/:id', async (ctx, next) => {
        try {
            ctx.body = await Thing.find({_id: ctx.params.id});
        } catch(err) {
// TODO: handle not found err.
            ctx.throw(500, err);
        }
    })

    // update
    .put('/:id', (ctx, next) => {
        try {
            ctx.body = 'Thing update!';
        } catch(err) {
            ctx.throw(500, err);
        }
    })

    // delete
    .delete('/:id', async (ctx, next) => {
        try {
            ctx.body = await Thing.remove({_id: ctx.params.id});
        } catch(err) {
            ctx.throw(500, err);
        }
    });

module.exports = router;