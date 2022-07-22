const {
  tables,
  getKnex
} = require('../data/index');

const {
  getChildLogger
} = require('../core/logging');

const uuid = require('uuid');

const SELECT_COLUMNS = [
  `${tables.transaction}.id`, 'amount', 'date',
  `${tables.place}.id as place_id`, `${tables.place}.name as place_name`,
  `${tables.user}.id as user_id`, `${tables.user}.name as user_name`,
];

const formatTransaction = ({
  place_id,
  place_name,
  user_id,
  user_name,
  ...rest
}) => ({
  ...rest,
  place: {
    id: place_id,
    name: place_name,
  },
  user: {
    id: user_id,
    name: user_name,
  },
});

const findById = async (id) => {
  const transaction = await getKnex()(tables.transaction)
    .join(`${tables.place}`, `${tables.place}.id`, '=', `${tables.transaction}.place_id`)
    .join(`${tables.user}`, `${tables.user}.id`, '=', `${tables.transaction}.user_id`)
    .where('id', id)
    .first(SELECT_COLUMNS);

  return transaction && formatTransaction(transaction);
};

const create = async ({
  amount,
  date,
  placeId,
  userId
}) => {

  try {
    const id = uuid.v4();
    await getKnex()(tables.transaction)
      .insert({
        id,
        amount,
        date,
        place_id: placeId,
        user_id: userId,
      });
    return await findById(id);

  } catch (error) {
    const logger = getChildLogger('transactions-repo');
    logger.error('Error in create', {
      error
    });
    throw error;
  }



};

module.exports = {
  // ...
  findById,
};