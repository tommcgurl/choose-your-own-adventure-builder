const query = require('./query');
const {
  adventure,
  adventureInput,
  adventureSearchInput,
} = require('./adventure');
const { user, userInput } = require('./user');
const scalars = require('./scalars');
const mutuation = require('./mutation');
const pageInfo = require('./pageInfo');
const paginatedAdventures = require('./paginatedAdventures');
const { genre, genreInput } = require('./genre');
const { breadcrumb, breadcrumbInput } = require('./breadcrumb');
const libraryBook = require('./libraryBook');
const { review, reviewInput } = require('./review');

module.exports = [
  query,
  mutuation,
  scalars,
  adventure,
  adventureInput,
  adventureSearchInput,
  user,
  userInput,
  pageInfo,
  paginatedAdventures,
  genre,
  genreInput,
  breadcrumb,
  breadcrumbInput,
  libraryBook,
  review,
  reviewInput,
];
