const queries = require('../../db/queries');
const { parseToken } = require('../../services/tokenService');

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
    createUser: (parent, { userInput }) => {
      console.log(userInput);
      const providerInfo = parseToken(userInput.providerToken);
      if (
        isValidUsername(userInput.username) &&
        providerInfo &&
        providerInfo.provider &&
        providerInfo.providerId
      ) {
        return queries.createUser(
          userInput.username,
          providerInfo.provider,
          providerInfo.providerId
        );
      }

      return null;
    },
  },
};

function isValidUsername(username) {
  return true;
}
