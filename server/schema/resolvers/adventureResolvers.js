const AdventureRepository = require('../../repositories/AdventureRepository');
const UserRepository = require('../../repositories/UserRepository');

module.exports = {
  Query: {
    adventures: () => AdventureRepository.getAdventures(),
  },
  Adventure: {
    authors: adventure => UserRepository.getUsersByIds(adventure.authorIds),
  },
};
