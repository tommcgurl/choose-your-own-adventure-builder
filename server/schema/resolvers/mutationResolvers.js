const queries = require('../../db/queries');

module.exports = {
  Mutation: {
    saveAdventure: (parent, { adventure }, { user }) => {
      if (user) {
        return queries.upsertAdventure(adventure, user.id);
      }
      // For now
      return null;
    },
    saveToLibrary: async (parent, { id: adventureId, progress }, { user }) => {
      if (user) {
        await queries.upsertAdventureReader(adventureId, user.id, progress);
        return adventureId;
      }
      return null;
    },
    removeFromLibrary: async (parent, { id: adventureId }, { user }) => {
      if (user) {
        await queries.deleteAdventureReader(adventureId, user.id);
        return adventureId;
      }
      return null;
    },
    deleteDraft: async (parent, { id: adventureId }, { user }) => {
      if (user) {
        const success = await queries.deleteDraft(adventureId, user.id);
        return success ? adventureId : null;
      }
      return null;
    },
  },
};
