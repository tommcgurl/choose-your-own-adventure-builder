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

function getUsersByIds(ids) {
  return mockUsers.filter(u => ids.indexOf(u.id.toString()) >= 0);
}

async function getUser(id) {
  // return mockUsers.filter(u => u.id.toString() === id.toString());
  const dbUser = await queries.getUserById(id);
  if (dbUser) {
    return mapDbUserToAppUser(dbUser);
  }
  return null;
}

function mapDbUserToAppUser(dbUser) {
  return {
    id: dbUser.id,
    username: dbUser.username,
    provider: dbUser.provider,
    providerId: dbUser.provider_id,
  };
}

module.exports = {
  getUserByProviderId,
  createUser,
  getUsersByIds,
  getUser,
};
