const path = require('path');
const resources = [
  '_vars.scss',
  '_global-mixins.scss',
  '_global.scss',
];
module.exports = resources.map(file => path.resolve(__dirname, file));
