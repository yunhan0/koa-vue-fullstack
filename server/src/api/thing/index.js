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
    .get('/', async (ctx, next) => {
        // index
        ctx.body = await Thing.find({}, 'name');
    })

    .post('/', async (ctx, next) => {
        // create
        ctx.body = await Thing.create(ctx.request.body);
    })

    .get('/:id', async (ctx, next) => {
        // show
        ctx.body = await Thing.find({_id: ctx.params.id});
    })

    .put('/:id', (ctx, next) => {
        // update
        ctx.body = 'Thing update!';
    })

    .delete('/:id', async (ctx, next) => {
        // delete
        ctx.body = await Thing.remove({_id: ctx.params.id});
    });

module.exports = router;