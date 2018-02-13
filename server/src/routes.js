const jwt = require('jsonwebtoken');
const secret = require('./api/auth/jwt').secret;

module.exports = function(app) {
    // Customized error handling, default error code: 500
    app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                // Handle Validation Error
                if(err.name === 'ValidationError') {
                    err.status = 422;
                } 
                // Handle Mongoose Item Duplication Error
                if (err.name === 'BulkWriteError' && err.code === 11000) {
                    err.status = 422;
                }
                ctx.status = err.status || 500;
                ctx.body = { message: err.message };
            }
        });       
    app.use(require('./api/auth').routes());
    // route middleware to verify a token
    app.use(async (ctx, next) => {
        try {
            let token = ctx.request.body.token || ctx.query.token || ctx.headers['access_token'];
            // decode token
            console.log(token);
            if(token) {
                await jwt.verify(token, secret);
                await next();
            } else {
                ctx.throw(403, 'No token provided');
            }
        } catch (err) {
            throw err;
        }
    });         
    app
        .use(require('./api/user').routes())
        .use(require('./api/thing').routes())
        .use(require('./api/thing').allowedMethods())             
};