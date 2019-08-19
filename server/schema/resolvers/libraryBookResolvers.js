const queries = require('../../db/queries');

module.exports = {
  LibraryBook: {
    user: parent => queries.getUserById(parent.userId),
    adventure: parent => queries.getAdventure(parent.adventureId),
  },
};
