const Koa = require('koa');
const config = require('config');
const {
  initializeLogger,
  getLogger
} = require('./core/logger');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const transactionService = require('./service/transaction');
const koaCors = require('@koa/cors');


//const NODE_ENV = process.env.NODE_ENV;
const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`);

const app = new Koa();

app.use(
  koaCors({
    origin: (ctx) => {
      if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
        return ctx.request.header.origin;
      }
      // Not a valid domain at this point, let's return the first valid as we should return a string
      return CORS_ORIGINS[0];
    },
    allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
    maxAge: CORS_MAX_AGE,
  })
);

initializeLogger({
  level: LOG_LEVEL,
  disabled: LOG_DISABLED,
  isProduction: NODE_ENV === 'production',
  defaultMeta: {
    NODE_ENV
  },
});

app.use(bodyParser());

const logger = getLogger();
const router = new Router();

router.get('/api/transactions', async (ctx) => {
  logger.info(JSON.stringify(ctx.request));
  ctx.body = transactionService.getAll();
})

router.post('/api/transactions', async (ctx) => {
  const newTransaction = transactionService.create({
    ...ctx.request.body,
    date: new Date(ctx.request.body.date)
  });
  ctx.body = newTransaction;
})

router.get('/api/transactions/:id', async (ctx) => {
  ctx.body = transactionService.getById(ctx.params.id);
})

app
  .use(router.routes())
  .use(router.allowedMethods());

logger.info(`🚀 Server listening on http://localhost:9000`);
app.listen(9000);