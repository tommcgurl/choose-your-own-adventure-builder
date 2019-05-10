const mockUsers = require("../mock_data/mockUsers");

const users = [];

class UserRepository {
  static getUserByProviderId(provider, providerId) {
    return users.find(
      u => u.provider === provider && u.providerId === providerId
    );
  }

  static createUser(provider, providerId, displayName) {
    const user = {
      id: "some id",
      displayName,
      provider,
      providerId
    };
    users.push(user);
    return user;
  }

  static getUsers() {
    return mockUsers;
  }

  static getUsersByIds(ids) {
    return mockUsers.filter(u => ids.indexOf(u.id.toString()) >= 0);
  }

  static getUser(id) {
    return mockUsers.filter(u => u.id.toString() === "1");
  }
}

module.exports = UserRepository;
