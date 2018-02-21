const jwt = require('jsonwebtoken');
const secret = require('./jwt').secret;
var User = require('../user/user.model');

module.exports = {
    isAuthenticated : async (ctx, next) => {
        try {
            let token = ctx.request.body.token || ctx.query.token || ctx.headers['access_token'];
            // decode token
            if(token) {
                let decoded = await jwt.verify(token, secret);
                let user = await User.findById({_id: decoded.id}, '-password');
                if (!user) { 
                    ctx.throw(404, "user not found");
                }
                // Attach user to state
                ctx.state.user = user;
                await next();
            } else {
                ctx.throw(403, 'No token provided');
            }
        } catch (err) {
            throw err;
        }
    }
}