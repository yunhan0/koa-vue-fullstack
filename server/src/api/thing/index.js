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

    .post('/', (ctx, next) => {
        // create
        ctx.body = 'Thing create!';
    })

    .get('/:id', async (ctx, next) => {
		// show
		ctx.body = await Thing.find({id: ctx.params.id});
    })

    .put('/:id', (ctx, next) => {
        // update
        ctx.body = 'Thing update!';
    })

    .delete('/:id', (ctx, next) => {
        // delete
        ctx.body = 'Thing delete!';
    });

module.exports = router;