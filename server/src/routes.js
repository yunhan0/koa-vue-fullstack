module.exports = function(app) {
    app
        .use(require('./api/thing').routes())
        .use(require('./api/thing').allowedMethods());
};