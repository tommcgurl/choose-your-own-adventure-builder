const AdventureRepository = require('../../repositories/adventureRepository');
const genreRepository = require('../../repositories/genreRepository');

module.exports = {
  Query: {
    paginatedAdventures: async (parent, { first, publishedBefore }) => {
      const paginatedAdventuresPlusOne = await AdventureRepository.getAdventures(
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
    adventure: (parent, { id }) => AdventureRepository.getAdventure(id),
    adventuresByRequestingUser: (parent, args, context) => {
      if (context.user) {
        return AdventureRepository.getAdventuresByAuthor(context.user.id);
      }
      // for now
      return [];
    },
    genres: () => genreRepository.getGenres(),
  },
};
