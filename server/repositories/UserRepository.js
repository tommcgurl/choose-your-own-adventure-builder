const queries = require('../db/queries');

async function getUserByProviderId(provider, providerId) {
  const user = await queries.getUserByProviderId(provider, providerId);
  return user || null;
}

async function createUser(provider, providerId, displayName) {
  const user = await queries.createUser(displayName, provider, providerId);
  return user || null;
}

async function getUser(id) {
  const user = await queries.getUserById(id);
  return user || null;
}

async function getAuthorsOfAdventure(adventureId) {
  const users = await queries.getAuthors(adventureId);
  return users || [];
}

async function addToLibrary(adventureId, userId) {
  await queries.insertAdventureReader(adventureId, userId);
}

async function removeFromLibrary(adventureId, userId) {
  await queries.deleteAdventureReader(adventureId, userId);
}

module.exports = {
  getUserByProviderId,
  createUser,
  getUser,
  getAuthorsOfAdventure,
  addToLibrary,
  removeFromLibrary,
};
