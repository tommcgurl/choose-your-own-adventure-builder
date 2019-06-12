const adventureRepository = require('../../repositories/adventureRepository');
const genreRepository = require('../../repositories/genreRepository');

module.exports = {
  Query: {
    paginatedAdventures: async (parent, { first, publishedBefore }) => {
      const paginatedAdventuresPlusOne = await adventureRepository.getAdventures(
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
    adventure: (parent, { id }) => adventureRepository.getAdventure(id),
    adventuresByRequestingUser: (parent, args, context) => {
      if (context.user) {
        return adventureRepository.getAdventuresByAuthor(context.user.id);
      }
      // for now
      return [];
    },
    genres: () => genreRepository.getGenres(),
    library: (parent, args, context) => {
      if (context.user) {
        return adventureRepository.getUserLibrary(context.user.id);
      }
      // for now
      return [];
    },
  },
};
