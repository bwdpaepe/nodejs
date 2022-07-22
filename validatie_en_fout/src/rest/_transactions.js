const Joi = require('joi');
const Router = require('@koa/router');
const transactionService = require('../service/transaction');
const {
	requireAuthentication
} = require('../core/auth');
const validate = require('./_validation');

const getAllTransactions = async (ctx) => {
	const limit = ctx.query.limit && Number(ctx.query.limit);
	const offset = ctx.query.offset && Number(ctx.query.offset);
	ctx.body = await transactionService.getAll(limit, offset);
};
getAllTransactions.validationScheme = {
	query: Joi.object({
		limit: Joi.number().positive().integer().max(1000).optional(),
		offset: Joi.number().integer().min(0).optional()
	}).and('limit', 'offset'),
};

const createTransaction = async (ctx) => {
	const newTransaction = await transactionService.create({
		...ctx.request.body,
		userId: ctx.state.session.userId,
		date: new Date(ctx.request.body.date),
	});
	ctx.body = newTransaction;
	ctx.status = 201;
};
createTransaction.validationScheme = {
	body: {
		amount: Joi.number().invalid(0),
		data: Joi.date().iso().less('now'),
		placeId: Joi.string().uuid(),
	}
}

const getTransactionById = async (ctx) => {
	ctx.body = await transactionService.getById(ctx.params.id);
};

const updateTransaction = async (ctx) => {
	ctx.body = await transactionService.updateById(ctx.params.id, {
		...ctx.request.body,
		userId: ctx.state.session.userId,
		date: new Date(ctx.request.body.date),
	});
};

const deleteTransaction = async (ctx) => {
	await transactionService.deleteById(ctx.params.id);
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

	router.get('/', requireAuthentication, validate(getAllTransactions.validationScheme), getAllTransactions);
	router.post('/', requireAuthentication, validate(createTransaction.validationScheme), createTransaction);
	router.get('/:id', requireAuthentication, getTransactionById);
	router.put('/:id', requireAuthentication, updateTransaction);
	router.delete('/:id', requireAuthentication, deleteTransaction);

	app.use(router.routes()).use(router.allowedMethods());
};