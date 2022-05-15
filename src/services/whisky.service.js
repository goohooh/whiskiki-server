const httpStatus = require('http-status');
const { Whisky } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Whisky>}
 */
const createWhisky = async (body) => {
  return Whisky.create(body);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWhiskies = async (agg) => {
  const whiskies = await Whisky.aggregate(agg);
  return whiskies;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Whisky>}
 */
const getWhiskyById = async (id) => {
  return Whisky.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<Whisky>}
 */
const getWhiskyByEmail = async (email) => {
  return Whisky.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Whisky>}
 */
const updateWhiskyById = async (userId, updateBody) => {
  const user = await getWhiskyById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Whisky not found');
  }
  if (updateBody.email && (await Whisky.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<Whisky>}
 */
const deleteWhiskyById = async (userId) => {
  const user = await getWhiskyById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Whisky not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createWhisky,
  queryWhiskies,
  getWhiskyById,
  getWhiskyByEmail,
  updateWhiskyById,
  deleteWhiskyById,
};
