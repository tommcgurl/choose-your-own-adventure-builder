const queries = require('../db/queries');
const mockUsers = require('../mock_data/mockUsers');

async function getUserByProviderId(provider, providerId) {
  // return users.find(
  //   u => u.provider === provider && u.providerId === providerId
  // );
  const dbUser = await queries.getUserByProviderId(provider, providerId);
  if (dbUser) {
    return mapDbUserToAppUser(dbUser);
  }
  return null;
}

async function createUser(provider, providerId, displayName) {
  // const user = {
  //   id: 'some id',
  //   displayName,
  //   provider,
  //   providerId,
  // };
  // users.push(user);
  const dbUser = await queries.createUser(displayName, provider, providerId);
  if (dbUser) {
    return mapDbUserToAppUser(dbUser);
  }
  return null;
}

async function getUser(id) {
  // return mockUsers.filter(u => u.id.toString() === id.toString());
  const dbUser = await queries.getUserById(id);
  if (dbUser) {
    return mapDbUserToAppUser(dbUser);
  }
  return null;
}

async function getAuthorsOfAdventure(adventureId) {
  const dbUsers = await queries.getAuthors(adventureId);
  if (dbUsers) {
    return dbUsers.map(mapDbUserToAppUser);
  }

  return [];
}

function mapDbUserToAppUser(dbUser) {
  return {
    id: dbUser.id,
    username: dbUser.username,
  };
}

module.exports = {
  getUserByProviderId,
  createUser,
  getUser,
  getAuthorsOfAdventure,
};
