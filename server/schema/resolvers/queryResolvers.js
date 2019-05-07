const AdventureRepository = require('../../repositories/AdventureRepository');

module.exports = {
  Query: {
    adventures: () => AdventureRepository.getAdventures(),
    adventure: id => AdventureRepository.getAdventure(id),
  },
};
