module.exports = function(app) {
    app.use(require('./api/thing').routes());
};