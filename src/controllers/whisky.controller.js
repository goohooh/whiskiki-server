const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { whiskyService } = require('../services');
const config = require('../config/config');
const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook(config.slack.webhookUrl);

// const createWhisky = catchAsync(async (req, res) => {
//   const user = await whiskyService.createWhisky(req.body);
//   res.status(httpStatus.CREATED).send(user);
// });

const ENGLISH = /^[A-Za-z0-9]*$/;

const FILTER_REGEX =
  /(할인|패키지|1인|1인당|1주년|오픈|특가|이벤트|논칠필터|당일픽업|특가|사전예약|선물|추첨|coming|only|1L|미니어처|1박스|세트)/gi;
const FILTER_CATEGORY_REGEX =
  /(와인|리큐르|진|백주|맥주|데킬라|사케|샴페인|칵테일|사이더|럼|소주|브랜디|꼬냑|보드카|라거|스타우트|깔바도스|막걸리|시럽|오드비)/gi;

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
        autocomplete: { query, path }
      }
    },
    {
      $match: { koName: { $not: FILTER_REGEX }, category: { $not: FILTER_CATEGORY_REGEX } }
    },
    {
      $project: {
        id: '$_id',
        legacyId: 1,
        enName: 1,
        koName: 1,
        country: 1,
        category: 1,
        abv: 1,
        imageUrl: 1
      }
    },
    { $project: { __v: 0, _id: 0 } },
    {
      $facet: {
        paginatedResults: [{ $skip }, { $limit }],
        totalCount: [
          {
            $count: 'count'
          }
        ]
      }
    }
  ]);

  const { paginatedResults, totalCount } = result[0];

  const totalCountNumber = totalCount[0]?.count || 0;

  res.send({
    status: 'SUCCESS',
    serverDatetime: new Date().toISOString(),
    data: {
      page,
      totalPage: Math.ceil(totalCountNumber / limit),
      totalCount: totalCountNumber,
      count: paginatedResults.length,
      keyword,
      result: paginatedResults
    }
  });
});

const getWhisky = catchAsync(async (req, res) => {
  try {
    const whisky = await whiskyService.getWhiskyById(req.params.whiskyId);
    if (!whisky) {
      return res.send({
        status: 'FAIL',
        serverDatetime: new Date().toISOString(),
        messsage: '위스키 정보가 존재하지 않습니다',
        data: {
          data: 'failed data'
        }
      });
    }
    res.send({
      status: 'SUCCESS',
      serverDatetime: new Date().toISOString(),
      data: whisky
    });
  } catch (e) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Whisky not found');
  }
});

const requestNewWhisky = catchAsync((req, res) => {
  res.render('requestNewWhisky');
});

const createRequestNewWhisky = catchAsync(async (req, res) => {
  // const base64Image = req.file.buffer.toString('base64');

  const { name, category, country } = req.body;
  await webhook.send({
    text: `새로운 위스키 신청이 접수 됐습니다.\n이름: ${name}\n종류: ${category || '없음'}\n국가: ${country || '없음'}`
    // blocks: [
    // {
    //   type: 'section'
    // }
    // {
    //   accessory: {
    //     type: 'image',
    //     image_url: `data:image/jpeg;base64,${base64Image}`,
    //     alt_text: name
    //   }
    // }
    // ]
  });
  res.redirect('/v1/api/whisky/request/success');
});
const requestSucceedNewWhisky = catchAsync((req, res) => {
  res.render('requestSucceedNewWhisky');
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
  requestNewWhisky,
  createRequestNewWhisky,
  requestSucceedNewWhisky
  // updateWhisky,
  // deleteWhisky,
};
