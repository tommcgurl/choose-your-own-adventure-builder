const AdventureRepository = require('../../repositories/AdventureRepository');

module.exports = {
  Query: {
    adventures: () => AdventureRepository.getAdventures(),
    adventure: (_, args) => AdventureRepository.getAdventure(args.id),
    drafts: (_, args, context) => {
      if (context.user) {
        return AdventureRepository.getDraftAdventures(context.user.id);
      }
      // for now
      return AdventureRepository.getDraftAdventures(1);
    },
  },
};
