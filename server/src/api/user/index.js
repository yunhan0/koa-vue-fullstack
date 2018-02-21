'use strict';
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const secret = require('../auth/jwt').secret;
var User = require('./user.model');

let router = new Router({
	prefix: '/api/users'
});

router
    // index
    .get('/', async (ctx, next) => {
        try {
            ctx.body = await User.find({}, '-password');
        } catch(err) {
            throw err;
        }
    })

    // create
    .post('/', async (ctx, next) => {
        try {
            let user = await User.create(ctx.request.body);
            // Sign token
            let token = await jwt.sign({id: user._id, role: user.role}, secret, {
                expiresIn: '1d'
            });
            ctx.status = 201; // Status code 201 : created
            ctx.body = {token: token};
        } catch(err) {
            throw err;
        }
    })

    // get my info
    .get('/me', async (ctx, next) => {
        try {
            ctx.body = ctx.state.user;
        } catch(err) {
            throw err;
        }
    })

    // get single user
    .get('/:id', async (ctx, next) => {
        try {
            let user = await User.findById({_id: ctx.params.id}, '-password');
            // Handle not found error
            if (!user) { ctx.throw(404, "not found"); }
            ctx.body = user;
        } catch(err) {
            throw err;
        }
    })

module.exports = router;