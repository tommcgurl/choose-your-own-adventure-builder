const queries = require('../../db/queries');

module.exports = {
  User: {
    bibliography: parent => queries.getPublishedAdventuresByAuthor(parent.id),
    drafts: parent => queries.getDraftsByAuthor(parent.id),
    library: parent => queries.getUserLibrary(parent.id),
    reviews: parent => queries.getReviewsByUser(parent.id),
  },
};
