const AdventureRepository = require('../../repositories/AdventureRepository');

module.exports = {
  Query: {
    adventures: (parent, { first, publishedBefore }) => {
      return AdventureRepository.getAdventures(first, publishedBefore);
    },
    adventure: (parent, { id }) => AdventureRepository.getAdventure(id),
    drafts: (parent, args, context) => {
      if (context.user) {
        return AdventureRepository.getDraftAdventures(context.user.id);
      }
      // for now
      return AdventureRepository.getDraftAdventures(1);
    },
  },
};
