const queries = require('../../db/queries');
const { searchAdventures } = require('../../services/elasticsearch');

module.exports = {
  Query: {
    paginatedAdventures: async (parent, { search }) => {
      const { adventureIds, hasNextPage } = await searchAdventures(search);
      const adventures = await queries.getAdventures(adventureIds);

      return {
        adventures,
        pageInfo: {
          hasNextPage,
        },
      };
    },
    adventure: (parent, { id }) => {
      return queries.getAdventure(id);
    },
    user: (parent, { username }, { user }) => {
      if (typeof username === 'string') {
        return queries.getUserByUsername(username);
      }

      if (user) {
        return queries.getUserById(user.id);
      }

      return null;
    },
    genres: () => queries.getGenres(),
    reviews: (parent, { adventureId }, { user }) => {
      if (adventureId) {
        return queries.getReviewsByAdventureId(adventureId);
      }
      if (user) {
        return queries.getReviewsByUser(user.id);
      }
      return null;
    },
  },
};
