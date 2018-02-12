'use strict';

const Router = require('koa-router');
var User = require('../user/user.model');

let router = new Router({
	prefix: '/auth'
});

router
    .post('/login', async(ctx, next) => {
        try {
            let email = ctx.request.body.email,
                password = ctx.request.body.password;
            let user = await User.findOne({email: email.toLowerCase()});

            if(!user) {
                ctx.throw(404, 'This email is not registered.')
            }

            let authenticated = await user.comparePassword(password)
            if(!authenticated) {
                ctx.throw(401, 'This password is not correct.');
            } else {
                ctx.body = user; // should return back a token..
            }
        } catch(err) {
            throw err;
        }
    });
    
module.exports = router;