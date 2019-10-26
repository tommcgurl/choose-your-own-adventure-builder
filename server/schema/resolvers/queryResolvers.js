const queries = require('../../db/queries');

module.exports = {
  Query: {
    paginatedAdventures: async (parent, { search }) => {
      const { take, publishedBefore, searchString, genres } = search;

      const genreIds = Array.isArray(genres)
        ? genres.map(genre => genre.id)
        : [];

      const paginatedAdventuresPlusOne = await queries.getPaginatedPublishedAdventures(
        take + 1,
        publishedBefore,
        searchString,
        genreIds
      );

      const paginatedAdventures = paginatedAdventuresPlusOne.slice(0, take + 1);

      const minDate = paginatedAdventures.length
        ? new Date(
            Math.min(...paginatedAdventures.map(a => new Date(a.published)))
          ).toISOString()
        : null;

      return {
        adventures: paginatedAdventures,
        pageInfo: {
          endCursor: minDate,
          hasNextPage: paginatedAdventuresPlusOne.length > take,
          searchString,
          genres,
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
