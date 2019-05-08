const AdventureRepository = require('../../repositories/AdventureRepository');

module.exports = {
  Mutation: {
    saveDraft: (_, { adventure }) =>
      AdventureRepository.createAdventure(adventure),
  },
};
