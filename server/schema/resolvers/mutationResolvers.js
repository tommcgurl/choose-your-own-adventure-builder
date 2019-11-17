const queries = require('../../db/queries');
const {
  pushAdventureToElasticSearch,
  updatePopularity,
  updateRating,
} = require('../../services/elasticsearch');

module.exports = {
  Mutation: {
    saveDraft: async (parent, { adventure }, { user }) => {
      if (user) {
        if (adventure.published) {
          await pushAdventureToElasticSearch(adventure);
        }
        return queries.upsertAdventure(adventure, user.id);
      }
      // For now
      return null;
    },
    saveToLibrary: async (parent, { adventureId, progress }, { user }) => {
      if (user) {
        const exists = await queries.userHasAdventureInLibrary(
          user.id,
          adventureId
        );
        await queries.upsertAdventureReader(adventureId, user.id, progress);
        if (!exists) {
          await updatePopularity(adventureId);
        }
        return adventureId;
      }
      return null;
    },
    removeFromLibrary: async (parent, { adventureId }, { user }) => {
      if (user) {
        await queries.deleteAdventureReader(adventureId, user.id);
        updatePopularity(adventureId);
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
        updateRating(adventureId);
        return review.id;
      }
      return null;
    },
    updateReview: async (parent, { updatedReview }, { user }) => {
      if (user) {
        const success = await queries.updateReview(updatedReview);
        updateRating(adventureId);
        return success ? updatedReview.id : null;
      }
    },
    deleteReview: async (parent, { reviewId }, { user }) => {
      if (user) {
        const success = await queries.deleteReview(reviewId);
        updateRating(adventureId);
        return success ? reviewId : null;
      }
    },
  },
};
