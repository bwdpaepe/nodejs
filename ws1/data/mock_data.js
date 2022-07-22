let PLACES = [{

    name: 'Dranken Geers',
    rating: 3,
  },
  {

    name: 'Irish Pub',
    rating: 2,
  },
  {
    name: 'Loon',
    rating: 4,
  },
];

let TRANSACTIONS = [{

    amount: -2000,
    date: '2021-05-08T00:00:00.000Z',
    user: {
      id: '7f28c5f9-d711-4cd6-ac15-d13d71abff80',
      name: 'Thomas Aelbrecht',
    },
    place: {
      id: '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
      name: 'Irish Pub',
    },
  },
  {

    amount: -74,
    date: '2021-05-21T12:30:00.000Z',
    user: {
      id: '7f28c5f9-d711-4cd6-ac15-d13d71abff80',
      name: 'Thomas Aelbrecht',
    },
    place: {
      id: '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
      name: 'Irish Pub',
    },
  },
  {

    amount: 3500,
    date: '2021-05-25T17:40:00.000Z',
    user: {
      id: '7f28c5f9-d711-4cd6-ac15-d13d71abff80',
      name: 'Thomas Aelbrecht',
    },
    place: {
      id: '7f28c5f9-d711-4cd6-ac15-d13d71abff83',
      name: 'Loon',
    },
  },
];

module.exports = {
  TRANSACTIONS,
  PLACES
};