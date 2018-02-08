'use strict';
const Router = require('koa-router');
var User = require('./user.model');

let router = new Router({
	prefix: '/api/users'
});

router
    // index
    .get('/', async (ctx, next) => {
        try {
            ctx.body = await User.find({}, '-salt -password');
        } catch(err) {
            throw err;
        }
    })

    // create
    .post('/', async (ctx, next) => {
        try {
            let user = new User(ctx.request.body);
            await user.save();
            ctx.status = 201; // Status code 201 : created
            ctx.body = user;
        } catch(err) {
            throw err;
        }
    })

    // get single user
    .get('/:id', async (ctx, next) => {
        try {
            let entity = await User.findById({_id: ctx.params.id}, '-salt -password');
            // Handle not found error
            if (!entity) { ctx.throw(404, "not found"); }
            ctx.body = entity;
        } catch(err) {
            throw err;
        }
    })

module.exports = router;