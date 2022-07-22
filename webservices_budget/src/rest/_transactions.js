const Router = require('@koa/router');
const transactionService = require('../service/transaction');

const getAllTransactions = async (ctx) => {
	ctx.body = transactionService.getAll();
};

const createTransaction = async (ctx) => {
	const newTransaction = transactionService.create({
		...ctx.request.body,
		date: new Date(ctx.request.body.date),
	});
	ctx.body = newTransaction;
};

const getTransactionById = async (ctx) => {
	ctx.body = transactionService.getById(ctx.params.id);
};

const updateTransaction = async (ctx) => {
	ctx.body = transactionService.updateById(ctx.params.id, {
		...ctx.request.body,
		date: new Date(ctx.request.body.date),
	});
};

const deleteTransaction = async (ctx) => {
	transactionService.deleteById(ctx.params.id);
	ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/transactions',
	});

	router.get('/', getAllTransactions);
	router.post('/', createTransaction);
	router.get('/:id', getTransactionById);
	router.put('/:id', updateTransaction);
	router.delete('/:id', deleteTransaction);

	app.use(router.routes()).use(router.allowedMethods());
};
