/* eslint-disable no-console */
// const rp = require('request-promise');
const fs = require('fs');
const path = require('path');

const keyMap = new Map();

const dir = fs.readdirSync(path.join(__dirname, 'data'));

dir.forEach((filename) => {
  const data = fs.readFileSync(path.join(__dirname, `data/${filename}`), 'utf-8');
  const whisky = JSON.parse(data);
  // if (whisky.en_name) {
  //   console.log(whisky.en_name);
  //   console.log(whisky.id);
  // } else {
  //   const parsed = JSON.parse(whisky);

  //   fs.writeFileSync(path.join(__dirname, `data/${filename}`), JSON.stringify(parsed, null, 2));
  // }
  Object.keys(whisky).reduce((acc, cur) => {
    if (acc.get(cur) === undefined) {
      acc.set(cur, 1);
    } else {
      acc.set(cur, acc.get(cur) + 1);
    }
    return acc;
  }, keyMap);
});

console.log([...keyMap]);
