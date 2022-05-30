const { Flavor } = require('../models');

/**
 * Query for flavor
 * @returns {Promise<QueryResult>}
 */
const queryFlavors = () => {
  return Flavor.find();
};

module.exports = {
  queryFlavors,
};
