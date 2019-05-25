const AdventureRepository = require('../../repositories/AdventureRepository');

module.exports = {
  Query: {
    adventures: () => AdventureRepository.getAdventures(),
    adventure: (parent, args) => AdventureRepository.getAdventure(args.id),
    drafts: (parent, args, context) => {
      if (context.user) {
        return AdventureRepository.getDraftAdventures(context.user.id);
      }
      // for now
      return AdventureRepository.getDraftAdventures(1);
    },
  },
};
