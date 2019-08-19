const queries = require('../../db/queries');

module.exports = {
  User: {
    bibliography: async parent =>
      queries.getPublishedAdventuresByAuthor(parent.id),
    drafts: async parent => queries.getDraftsByAuthor(parent.id),
    library: parent => queries.getUserLibrary(parent.id),
  },
};
