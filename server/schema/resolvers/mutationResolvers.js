const adventureRepository = require('../../repositories/adventureRepository');

module.exports = {
  Mutation: {
    saveDraft: async (_, { adventure }, context) => {
      if (context.user) {
        const existingAdventure = await adventureRepository.getAdventure(
          adventure.id
        );
        if (existingAdventure) {
          return adventureRepository.updateAdventure(
            adventure,
            context.user.id
          );
        }
        return adventureRepository.createAdventure(adventure, context.user.id);
      }
      // For now
      return null;
    },
  },
};
