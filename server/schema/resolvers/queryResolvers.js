const AdventureRepository = require('../../repositories/AdventureRepository');

module.exports = {
  Query: {
    adventures: () => AdventureRepository.getAdventures(),
    adventure: (parent, args) => AdventureRepository.getAdventure(args.id),
    drafts: (parent, args, context) =>
      AdventureRepository.getDraftAdventures(context.user.id),
  },
};
