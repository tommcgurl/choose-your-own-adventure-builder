const adventureRepository = require('../../repositories/adventureRepository');
const userRepository = require('../../repositories/userRepository');

module.exports = {
  Mutation: {
    saveDraft: async (_, { adventure }, { user }) => {
      if (user) {
        const existingAdventure = await adventureRepository.getAdventure(
          adventure.id
        );
        if (existingAdventure) {
          return adventureRepository.updateAdventure(adventure, user.id);
        }
        return adventureRepository.createAdventure(adventure, user.id);
      }
      // For now
      return null;
    },
    addToLibrary: async (_, { id: adventureId }, { user }) => {
      if (user) {
        await userRepository.addToLibrary(adventureId, user.id);
        return adventureId;
      }
      return null;
    },
    removeFromLibrary: async (_, { id: adventureId }, { user }) => {
      if (user) {
        await userRepository.removeFromLibrary(adventureId, user.id);
        return adventureId;
      }
      return null;
    },
    deleteDraft: async (_, { id: adventureId }, { user }) => {
      if (user) {
        const draft = await adventureRepository.getAdventure(adventureId);
        if (draft && !draft.published) {
          const authors = await userRepository.getAuthorsOfAdventure(
            adventureId
          );
          const authorIds = authors.map(a => a.id);
          if (authorIds.indexOf(user.id) > -1) {
            await adventureRepository.deleteDraftAdventure(adventureId);
            return adventureId;
          }
        }
      }
      return null;
    },
  },
};
