const UserRepository = require('../repositories/UserRepository');

module.exports = {
  getUser: token => UserRepository.getUser(),
};
