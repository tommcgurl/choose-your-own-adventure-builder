const queries = require('../../db/queries');

module.exports = {
  Query: {
    paginatedAdventures: async (parent, { first, publishedBefore }) => {
      const paginatedAdventuresPlusOne = await queries.getPublishedAdventures(
        first + 1,
        publishedBefore
      );

      const paginatedAdventures = paginatedAdventuresPlusOne.slice(
        0,
        first + 1
      );
      const minDate = Math.min(
        ...paginatedAdventures.map(a => new Date(a.published))
      );

      return {
        adventures: paginatedAdventures,
        pageInfo: {
          endCursor: new Date(minDate).toISOString(),
          hasNextPage: paginatedAdventuresPlusOne.length > first,
        },
      };
    },
    adventure: (parent, { id }) => queries.getAdventure(id),
    adventuresByRequestingUser: (parent, args, { user }) => {
      if (user) {
        return queries.getAdventuresByAuthor(user.id);
      }
      // for now
      return [];
    },
    genres: () => queries.getGenres(),
    library: (parent, args, { user }) => {
      if (user) {
        return queries.getUserLibrary(user.id);
      }
      // for now
      return [];
    },
  },
};
