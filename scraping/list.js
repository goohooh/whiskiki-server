const fs = require('fs');
const path = require('path');

const dir = fs.readdirSync(path.join(__dirname, 'parsed2'));
const list = [];
dir.forEach(async (filename) => {
  const data = fs.readFileSync(path.join(__dirname, `parsed2/${filename}`), 'utf-8');
  const json = JSON.parse(data);
  list.push(json.koName);
});

fs.writeFileSync(path.join(__dirname, 'list.json'), JSON.stringify(list));
