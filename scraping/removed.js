/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const { Whisky } = require('../src/models');

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}
const dir = fs.readdirSync(path.join(__dirname, 'output'));
const whiskies = [];
dir.forEach(async (filename) => {
  const data = fs.readFileSync(path.join(__dirname, `output/${filename}`), 'utf-8');
  const { id, imageUrl } = JSON.parse(data);
  whiskies.push({ id, imageUrl });
});

module.exports = () => {
  console.log('Start seeding...');
  try {
    whiskies.forEach(({ id, imageUrl }) => {
      Whisky.update({ legacyId: id }, { $set: { imageUrl } }, { multi: true });
      console.log(`${id}: ${imageUrl}`);
      sleep(250);
    });
  } catch (e) {
    console.error(e);
  }
  console.log('Seeding finished!');
};
