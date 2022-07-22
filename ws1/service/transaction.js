let {
  PLACES,
  TRANSACTIONS
} = require('../data/mock_data');
const {
  getChildLogger
} = require('../core/logger');

const logger = getChildLogger();

const getAll = () => {
  return {
    data: TRANSACTIONS,
    count: TRANSACTIONS.length
  };
}

const getById = (id) => {
  throw new Error("not implemented yet");
}

const create = ({
  amount,
  data,
  placeId,
  user
}) => {
  let existingPlace;
  if (placeId) {
    existingPlace = PLACES.filter((place) => place.id === placeId);
    if (!existingPlace) {
      logger.error(`There is no place with id ${id}.`, {
        id
      });
    }
  }
  if (typeof user === 'string') {
    user = {
      id: uuid.v4(),
      name: user
    };
  }
  const newTransaction = {
    id: uuid.v4(),
    amount,
    date: date.toISOString(),
    place: existingPlace,
  };
  TRANSACTIONS = [...TRANSACTIONS, newTransaction];
  return newTransaction;
}

const updateById = (id, {
  amount,
  data,
  placeId,
  user
}) => {
  throw new Error("not implemented yet");
}

const deleteById = (id) => {
  throw new Error("not implemented yet");
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}