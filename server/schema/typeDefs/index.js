const query = require('./query');
const { adventure, adventureInput } = require('./adventure');
const { items, itemsInput } = require('./items');
const { mainStory, mainStoryInput } = require('./mainStory');
const { colorPalette, colorPaletteInput } = require('./colorPalette');
const { user, userInput } = require('./user');
const scalars = require('./scalars');
const mutuation = require('./mutation');

module.exports = [
  query,
  mutuation,
  scalars,
  adventure,
  adventureInput,
  items,
  itemsInput,
  mainStory,
  mainStoryInput,
  colorPalette,
  colorPaletteInput,
  user,
  userInput,
];
