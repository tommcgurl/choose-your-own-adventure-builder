const queries = require('../../db/queries');

module.exports = {
  User: {
    bibliography: async parent =>
      (await queries.getAdventuresByAuthor(parent.id)).filter(
        adventure => adventure.published
      ),
  },
};
