'use strict'
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const secret = require('../../config').secret.auth
const auth = require('../auth/service')
var User = require('./user.model')

let router = new Router({
	prefix: '/api/users'
})

router
    /**
     * Get list of users
     * restriction: 'admin'
     */
    .get('/', auth.isAuthenticated, auth.hasRole('admin'), async (ctx, next) => {
        try {
            ctx.body = await User.find({}, '-password')
        } catch(err) {
            throw err
        }
    })

    // create
    .post('/', async (ctx, next) => {
        try {
            let user = await User.create(ctx.request.body)
            // Sign token
            let token = await jwt.sign({id: user._id, role: user.role}, secret, {
                expiresIn: '1d'
            })
            ctx.status = 201 // Status code 201 : created
            ctx.body = {token: token}
        } catch(err) {
            throw err
        }
    })

    // get my info
    .get('/me', auth.isAuthenticated, async (ctx, next) => {
        try {
            ctx.body = ctx.state.user
        } catch(err) {
            throw err
        }
    })

    // get single user
    .get('/:id', auth.isAuthenticated, async (ctx, next) => {
        try {
            let user = await User.findById({_id: ctx.params.id}, '-password')
            // Handle not found error
            if (!user) { ctx.throw(404, "not found") }
            ctx.body = user
        } catch(err) {
            throw err
        }
    })

    .put('/me/password', auth.isAuthenticated, async (ctx, next) => {
        try {
            let user = await User.findById({_id: ctx.state.user._id})

            if(!user) { ctx.throw(404, 'not found') }

            let authenticated = await user.comparePassword(ctx.request.body.oldPassword)

            if(!authenticated) {
                ctx.throw(403, 'Old password is not correct.')
            } else {
                user.password = ctx.request.body.newPassword
                user.save()
                ctx.status = 200
            }
        } catch(err) {
            throw err
        }
    })

    /****************** Obsolete methods ******************/
    /**
     * Creates a new user
     * restriction: 'admin'
     * Todo: better to be granted higher access instead of creating by admin?
     */
    // .post('/signupByAdmin', auth.hasRole('admin'), async (ctx, next) => {
    //     try {
    //         let user = await User.create(ctx.request.body)
    //         ctx.status = 201 // Status code 201 : created
    //         ctx.body = 'User created!'
    //     } catch(err) {
    //         throw err
    //     }
    // })
module.exports = router