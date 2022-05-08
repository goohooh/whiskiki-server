const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { whiskyService } = require('../services');

// const createWhisky = catchAsync(async (req, res) => {
//   const user = await whiskyService.createWhisky(req.body);
//   res.status(httpStatus.CREATED).send(user);
// });

const getWhiskies = catchAsync(async (req, res) => {
  const { keyword } = req.query;
  const filter = { name_ko: keyword };
  const options = { limit: 20, page: 1 };
  const result = await whiskyService.queryWhiskies(filter, options);
  res.send(result);
});

const getWhisky = catchAsync(async (req, res) => {
  const whisky = await whiskyService.getWhiskyById(req.params.whiskyId);
  if (!whisky) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Whisky not found');
  }
  res.send(whisky);
});

// const updateWhisky = catchAsync(async (req, res) => {
//   const user = await whiskyService.updateWhiskyById(req.params.whiskyId, req.body);
//   res.send(user);
// });

// const deleteWhisky = catchAsync(async (req, res) => {
//   await whiskyService.deleteWhiskyById(req.params.whiskyId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  // createWhisky,
  getWhiskies,
  getWhisky,
  // updateWhisky,
  // deleteWhisky,
};
