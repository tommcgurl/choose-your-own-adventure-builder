const mockUsers = require('../mock_data/mockUsers');

class UserRepository {
  static getUsers() {
    return mockUsers;
  }

  static getUsersByIds(ids) {
    return mockUsers.filter(u => ids.indexOf(u.id.toString()) >= 0);
  }

  static getUser(id) {
    return mockUsers.filter(u => u.id.toString() === '1');
  }
}

module.exports = UserRepository;
