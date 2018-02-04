module.exports = function(app) {
    // Customized error handling, default error code: 500
    app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                ctx.status = err.status || 500;
                ctx.body = { message: err.message };
            }
        });
    
    app
        .use(require('./api/thing').routes())
        .use(require('./api/thing').allowedMethods());
};