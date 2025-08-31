const fs = require('fs');
const path = require('path');

const from = path.join(__dirname, '..', 'public', 'logo192.png');
const to = path.join(__dirname, '..', 'public', 'favicon.ico');

try {
  fs.copyFileSync(from, to);
  console.log(`Copied ${from} -> ${to}`);
} catch (err) {
  console.error('Failed to copy favicon:', err);
  process.exit(1);
}
