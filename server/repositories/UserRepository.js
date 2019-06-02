const queries = require('../db/queries');

async function getUserByProviderId(provider, providerId) {
  const dbUser = await queries.getUserByProviderId(provider, providerId);
  if (dbUser) {
    return mapDbUserToAppUser(dbUser);
  }
  return null;
}

async function createUser(provider, providerId, displayName) {
  const dbUser = await queries.createUser(displayName, provider, providerId);
  if (dbUser) {
    return mapDbUserToAppUser(dbUser);
  }
  return null;
}

async function getUser(id) {
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

async function addToLibrary(adventureId, userId) {
  await queries.insertAdventureReader(adventureId, userId);
}

async function removeFromLibrary(adventureId, userId) {
  await queries.deleteAdventureReader(adventureId, userId);
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
  addToLibrary,
  removeFromLibrary,
};
