const queries = require('../../db/queries');

module.exports = {
  Mutation: {
    saveAdventure: async (parent, { adventure }, { user }) => {
      if (user) {
        return queries.upsertAdventure(adventure, user.id);
      }
      // For now
      return null;
    },
    addToLibrary: async (parent, { id: adventureId }, { user }) => {
      if (user) {
        await queries.insertAdventureReader(adventureId, user.id);
        return adventureId;
      }
      return null;
    },
    removeFromLibrary: async (_, { id: adventureId }, { user }) => {
      if (user) {
        await queries.deleteAdventureReader(adventureId, user.id);
        return adventureId;
      }
      return null;
    },
    deleteDraft: async (_, { id: adventureId }, { user }) => {
      if (user) {
        const success = await queries.deleteDraft(adventureId, user.id);
        return success ? adventureId : null;
      }
      return null;
    },
  },
};
