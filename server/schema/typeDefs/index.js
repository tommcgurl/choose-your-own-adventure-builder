const query = require('./query');
const adventure = require('./adventure');
const items = require('./items');
const mainStory = require('./mainStory');
const colorPalette = require('./colorPalette');
const user = require('./user');
const scalars = require('./scalars');

module.exports = [
  query,
  scalars,
  adventure,
  items,
  mainStory,
  colorPalette,
  user,
];
