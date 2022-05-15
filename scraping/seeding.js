/* eslint-disable no-console */
const rp = require('request-promise');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function get(uri) {
  return rp({
    uri,
    transform(body) {
      return cheerio.load(body);
    },
  });
}

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const dir = fs.readdirSync(path.join(__dirname, 'data'));
const parsed = fs.readdirSync(path.join(__dirname, 'parsed2'));

dir
  .filter((name) => !parsed.includes(name))
  .forEach(async (filename) => {
    const data = fs.readFileSync(path.join(__dirname, `data/${filename}`), 'utf-8');
    const whisky = JSON.parse(data);
    if (whisky.web_url) {
      try {
        const $ = await get(whisky.web_url);

        const en = $('.en-name').text();
        const ko = $('.ko-name').text();
        let category = '';
        let abv = '';
        let country = '';

        $('.product-info-row .label').each((idx, el) => {
          const element = $(el);
          if (element.text() === '종류') {
            category = element.parent().find('.content').text();
          }
          if (element.text() === '국가') {
            country = element.parent().find('.content').text();
          }
          if (element.text() === '도수') {
            abv = element.parent().find('.content').text();
          }
        });

        const json = {
          id: whisky.id,
          enName: en,
          koName: ko,
          imageUrl: whisky.thumbnail_image,
          country,
          category,
          abv,
        };

        fs.writeFileSync(path.join(__dirname, `parsed2/${filename}`), JSON.stringify(json));
        console.error(`Parsed: ${whisky.id} - ${whisky.name}`);
      } catch (e) {
        fs.writeFileSync(path.join(__dirname, `parsedError/${filename}`), JSON.stringify(e));
        console.error(`Error: ${whisky.id} - ${whisky.name}`);
      }
      sleep(1000);
    }
  });

// get('https://api.dailyshot.co/pickup/products/1419/detail/?native=true').then(($) => {
//   let category = '';
//   let abv = '';
//   let country = '';

//   $('.product-info-row .label').each((idx, el) => {
//     const element = $(el);
//     if (element.text() === '종류') {
//       category = element.parent().find('.content').text();
//     }
//     if (element.text() === '국가') {
//       country = element.parent().find('.content').text();
//     }
//     if (element.text() === '도수') {
//       abv = element.parent().find('.content').text();
//     }
//   });

//   console.log({
//     category,
//     country,
//     abv,
//   });
// });
