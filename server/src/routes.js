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
    
    app
        .use(require('./api/thing').routes())
        .use(require('./api/thing').allowedMethods())
        .use(require('./api/user').routes())
        .use(require('./api/auth').routes());
};