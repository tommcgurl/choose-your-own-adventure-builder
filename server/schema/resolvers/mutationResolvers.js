const adventureRepository = require('../../repositories/adventureRepository');

module.exports = {
  Mutation: {
    saveDraft: (_, { adventure }, context) => {
      if (context.user) {
        return adventureRepository.createOrUpdateAdventure(adventure, user.id);
      }
      // For now, use userId of 1
      return adventureRepository.createOrUpdateAdventure(adventure, 1);
    },
  },
};
