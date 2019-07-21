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
    adventure: (parent, { id }) => {
      return queries.getAdventure(id);
    },
    libraryBook: (parent, {id}, {user}) => {
      if (user) {
        const adventure = await queries.getAdventure(id);
        if (adventure) {
          const progress = await queries.getProgress(user.id, id);
          return {adventure, progress};
        }
      }
      return {};
    },
    adventuresByRequestingUser: (parent, args, { user }) => {
      if (user) {
        return queries.getAdventuresByAuthor(user.id);
      }
      // for now
      return [];
    },
    genres: () => queries.getGenres(),
    library: async (parent, args, { user }) => {
      if (user) {
        const [adventures, progressions] = await queries.getUserLibrary(
          user.id
        );
        return adventures.map(adventure => ({
          adventure,
          progress: progressions.find(p => p.adventureId === adventure.id)
            .progress,
        }));
      }
      // for now
      return [];
    },
    progress: (parent, { id }, { user }) => {
      if (user) {
        return queries.getProgress(user.id, id);
      }
      return [];
    },
  },
};
