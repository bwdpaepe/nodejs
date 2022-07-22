const Koa = require('koa');
const {
  getLogger
} = require('./core/logging');
const logger = getLogger();
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('1');
  await next();
  console.log('2');
});

app.use(async (ctx) => {
  ctx.body = 'Hello world!';
});

app.listen(3000);
const port = 3000;
logger.info(`Server is listening on port ${port}`);