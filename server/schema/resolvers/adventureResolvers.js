const queries = require('../../db/queries');

module.exports = {
  Adventure: {
    authors: parent => queries.getAuthors(parent.id),
    genre: parent => queries.getGenre(parent.genreId),
  },
};
