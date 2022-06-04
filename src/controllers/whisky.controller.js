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
  const { keyword, limit = 20, page = 0 } = req.query;

  const query = decodeURIComponent(keyword);
  const path = ENGLISH.test(query) ? 'enName' : 'koName';

  const $skip = Number.parseInt(page * limit, 10);
  const $limit = Number.parseInt(limit, 10);

  const result = await whiskyService.queryWhiskies([
    {
      $search: {
        index: 'name',
        autocomplete: { query, path },
      },
    },
    { $project: { id: '$_id', legacyId: 1, enName: 1, koName: 1, country: 1, category: 1, abv: 1 } },
    { $project: { __v: 0, _id: 0 } },
    {
      $facet: {
        paginatedResults: [{ $skip }, { $limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);

  const { paginatedResults, totalCount } = result[0];

  res.send({
    status: 'SUCCESS',
    serverDatetime: new Date().toISOString(),
    data: {
      totalCount: totalCount[0].count,
      count: paginatedResults.length,
      keyword,
      result: paginatedResults,
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
