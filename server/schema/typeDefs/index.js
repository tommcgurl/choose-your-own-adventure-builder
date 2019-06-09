const query = require('./query');
const { adventure, adventureInput } = require('./adventure');
const { user, userInput } = require('./user');
const scalars = require('./scalars');
const mutuation = require('./mutation');
const pageInfo = require('./pageInfo');
const paginatedAdventures = require('./paginatedAdventures');
const { genre, genreInput } = require('./genre');

module.exports = [
  query,
  mutuation,
  scalars,
  adventure,
  adventureInput,
  user,
  userInput,
  pageInfo,
  paginatedAdventures,
  genre,
  genreInput,
];
