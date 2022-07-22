const uuid = require('uuid');
const { getChildLogger } = require('../core/logging');
let { PLACES } = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getChildLogger('place-service');
	this.logger.debug(message, meta);
};

const getAll = () => {
	debugLog('Fetching all places');
	return { data: PLACES, count: PLACES.length };
};

const getById = (id) => {
	debugLog(`Fetching place with id ${id}`);
	return PLACES.filter((place) => place.id === id)[0];
};

const create = ({ name, rating }) => {
	const newPlace = { id: uuid.v4(), name, rating };
	debugLog('Creating new place', newPlace);
	PLACES = [...PLACES, newPlace];
	return newPlace;
};

const updateById = (id, { name, rating }) => {
	debugLog(`Updating place with id ${id}`, { name, rating });
	const index = PLACES.findIndex((place) => place.id === id);

	if (index < 0) return null;

	const place = PLACES[index];
	place.rating = rating;
	place.name = name;

	return place;
};

const deleteById = (id) => {
	debugLog(`Deleting place with id ${id}`);
	PLACES = PLACES.filter((place) => place.id !== id);
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};
