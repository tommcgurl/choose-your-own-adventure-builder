const queries = require('../../db/queries');

module.exports = {
  Adventure: {
    authors: parent => queries.getAuthors(parent.id),
    genre: parent => queries.getGenre(parent.genreId),
    reviews: parent => queries.getReviewsByAdventureId(parent.id),
    popularity: parent => queries.getAdventurePopularity(parent.id),
    rating: parent => queries.getAdventureRating(parent.id),
  },
};
