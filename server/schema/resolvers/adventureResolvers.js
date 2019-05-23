const userRepository = require('../../repositories/UserRepository');

module.exports = {
  Adventure: {
    authors: parent => userRepository.getUsersByIds(parent.authorIds),
  },
};
