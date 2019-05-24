const adventureRepository = require('../../repositories/adventureRepository');

module.exports = {
  Mutation: {
    saveDraft: (_, { adventure }) => {
      return adventureRepository.createAdventure(adventure);
    },
  },
};
