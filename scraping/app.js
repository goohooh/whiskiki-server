/* eslint-disable no-console */
const rp = require('request-promise');
const fs = require('fs');
// const cheerio = require('cheerio');

const ids = new Array(2614).fill(undefined).map((_, idx) => idx + 1);

const createOptions = (id) => ({
  uri: `https://api.dailyshot.co/pickup/products/${id}`,
});

ids.forEach(async (id) => {
  const option = createOptions(id);
  try {
    const json = await rp(option);

    fs.writeFileSync(`data/${id}.json`, JSON.stringify(json));
    console.log(id);
  } catch (e) {
    fs.writeFileSync(`error/${id}.json`, JSON.stringify(e));
    console.log(`error id: ${id}`);
  }
});
