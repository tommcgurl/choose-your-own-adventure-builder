const queries = require('../../db/queries');

module.exports = {
  Mutation: {
    saveDraft: (parent, { adventure }, { user }) => {
      if (user) {
        return queries.upsertAdventure(adventure, user.id);
      }
      // For now
      return null;
    },
    saveToLibrary: async (parent, { adventureId, progress }, { user }) => {
      if (user) {
        await queries.upsertAdventureReader(adventureId, user.id, progress);
        return adventureId;
      }
      return null;
    },
    removeFromLibrary: async (parent, { adventureId }, { user }) => {
      if (user) {
        await queries.deleteAdventureReader(adventureId, user.id);
        return adventureId;
      }
      return null;
    },
    deleteDraft: async (parent, { adventureId }, { user }) => {
      if (user) {
        const success = await queries.deleteDraft(adventureId, user.id);
        return success ? adventureId : null;
      }
      return null;
    },
    addReview: async (parent, { adventureId, review }, { user }) => {
      if (user) {
        await queries.insertReview(adventureId, review, user.id);
        return review.id;
      }
      return null;
    },
    updateReview: async (parent, { adventureId, updatedReview }, { user }) => {
      // TODO write this shit
    },
  },
};
