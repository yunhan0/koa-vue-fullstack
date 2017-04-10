const Koa = require('koa');
const Router = require('koa-router');
 
let app = new Koa();
let router = new Router();
 
router.get('/', (ctx, next) => {
  ctx.body = "Hello from koa";
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);