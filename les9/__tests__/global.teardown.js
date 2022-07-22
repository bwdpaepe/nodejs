const {
  shutdownData,
  getKnex,
  tables
} = require("../src/data")

module.exports = async () => {
  await getKnex()(tables.transaction).delete();
  await getKnex()(tables.user).delete();
  await getKnex()(tables.place).delete();

  await shutdownData();
};