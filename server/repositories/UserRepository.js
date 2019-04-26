const mockUsers = require("../mock_data/mockUsers");

class UserRepository {
  static getUsers() {
    return mockUsers;
  }
}

module.exports = UserRepository;
