const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { flavorService } = require('../services');

const getFlavors = catchAsync(async (req, res) => {
  const flavors = await flavorService.queryFlavors();

  if (!flavors.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flavors not found');
  }

  res.send({
    status: 'SUCCESS',
    serverDatetime: new Date().toISOString(),
    data: {
      flavors,
    },
  });
});

module.exports = {
  getFlavors,
};
