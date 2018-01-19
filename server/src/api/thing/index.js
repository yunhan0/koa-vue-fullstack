/**
 * GET      /api/things         -> index
 * POST     /api/things         -> create
 * GET      /api/things/:id     -> show
 * PUT      /api/things/:id     -> update
 * DELETE   /api/things/:id     -> delete
 */

'use strict';
const koaRouter = require('koa-router');

let router = new koaRouter();

router.get('/', (ctx, next) => {
    // index
});

router.post('/', (ctx, next) => {
    // create
});

router.get('/:id', (ctx, next) => {
    // show
});

router.put('/:id', (ctx, next) => {
    // update
});

router.delete('/:id', (ctx, next) => {
    // delete
});