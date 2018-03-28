const jwt = require('jsonwebtoken')
const secret = require('../../config').secret.auth
var User = require('../user/user.model')

module.exports = {
    isAuthenticated : async (ctx, next) => {
        try {
            let token = ctx.request.body.token || ctx.query.token || ctx.headers['access_token']
            // decode token
            if(token) {
                let decoded = await jwt.verify(token, secret)
                let user = await User.findById({_id: decoded.id}, '-password')
                if (!user) { 
                    ctx.throw(404, "User not found")
                }
                // Attach user to state
                ctx.state.user = user
                await next()
            } else {
                ctx.throw(401, 'No token provided')
            }
        } catch (err) {
            // Errors coming from token validation
            if(err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
                err.status = 401
            }
            throw err
        }
    },
    hasRole: (role) => {
        return async (ctx, next) => {
            try {
                if (ctx.state.user.role !== role) {
                    ctx.throw(403, "Forbidden")
                }
                await next()
            } catch (err) {
                throw err
            }
        }
    }
}