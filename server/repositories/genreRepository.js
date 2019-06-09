const queries = require('../db/queries');

module.exports = {
  getGenres: async () => {
    return await queries.getGenres();
  },
  getGenre: async id => {
    return await queries.getGenre(id);
  },
};
