const UserRepository = require('../../repositories/UserRepository');

module.exports = {
  Adventure: {
    authors: parent => UserRepository.getUsersByIds(parent.authorIds),
  },
};
