const Router = require('@koa/router');
const placeService = require('../service/place');

const getAllPlaces = async (ctx) => {
	ctx.body = placeService.getAll();
};

const createPlace = async (ctx) => {
	const newPlace = placeService.create(ctx.request.body);
	ctx.body = newTransaction;
};

const getPlaceById = async (ctx) => {
	ctx.body = placeService.getById(ctx.params.id);
};

const updatePlace = async (ctx) => {
	ctx.body = placeService.updateById(ctx.params.id, ctx.request.body);
};

const deletePlace = async (ctx) => {
	placeService.deleteById(ctx.params.id);
	ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/places',
	});

	router.get('/', getAllPlaces);
	router.post('/', createPlace);
	router.get('/:id', getPlaceById);
	router.put('/:id', updatePlace);
	router.delete('/:id', deletePlace);

	app.use(router.routes()).use(router.allowedMethods());
};
