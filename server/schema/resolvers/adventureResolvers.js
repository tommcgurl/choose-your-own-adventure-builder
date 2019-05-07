const UserRepository = require('../../repositories/UserRepository');

module.exports = {
  Adventure: {
    authors: adventure => UserRepository.getUsersByIds(adventure.authorIds),
  },
};
