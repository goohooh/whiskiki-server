const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { whiskyService } = require('../services');

// const createWhisky = catchAsync(async (req, res) => {
//   const user = await whiskyService.createWhisky(req.body);
//   res.status(httpStatus.CREATED).send(user);
// });

const ENGLISH = /^[A-Za-z0-9]*$/;

const getWhiskies = catchAsync(async (req, res) => {
  const { keyword, limit = 20 } = req.query;

  const query = decodeURIComponent(keyword);
  const path = ENGLISH.test(query) ? 'enName' : 'koName';

  const result = await whiskyService.queryWhiskies([
    {
      $search: {
        index: 'name',
        autocomplete: { query, path },
      },
    },
    { $limit: limit },
    { $project: { __v: 0 } },
  ]);

  res.send({
    status: 'SUCCESS',
    serverDatetime: new Date().toISOString(),
    data: {
      count: result.length,
      keyword,
      result,
    },
  });
});
const getWhisky = catchAsync(async (req, res) => {
  const whisky = await whiskyService.getWhiskyById(req.params.whiskyId);
  if (!whisky) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Whisky not found');
  }
  res.send({
    status: 'SUCCESS',
    serverDatetime: new Date().toISOString(),
    data: whisky,
  });
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
