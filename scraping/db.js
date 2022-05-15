/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const { Whisky } = require('../src/models');

const dir = fs.readdirSync(path.join(__dirname, 'parsed2'));
const whiskies = [];
dir.forEach(async (filename) => {
  const data = fs.readFileSync(path.join(__dirname, `parsed2/${filename}`), 'utf-8');
  const { id, ...rest } = JSON.parse(data);
  whiskies.push({
    legacyId: id,
    ...rest,
  });
});

module.exports = () => {
  console.log('Start seeding...');
  try {
    Whisky.insertMany(whiskies);
  } catch (e) {
    console.error(e);
  }
  console.log('Seeding finished!');
};
