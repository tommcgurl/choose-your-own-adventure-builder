const queries = require('../db/queries');

async function getAdventures(first, publishedBefore) {
  const adventures = await queries.getPublishedAdventures(
    first,
    publishedBefore
  );

  return adventures || [];
}

async function getAdventure(id) {
  const adventure = await queries.getAdventure(id);
  return adventure || null;
}

async function getAdventuresByAuthor(userId) {
  const adventures = await queries.getAdventuresByAuthor(userId);
  return adventures || [];
}

async function deleteDraftAdventure(draftId) {
  await queries.deleteDraft(draftId);
}

async function createAdventure(adventure, authorId) {
  let persistedAdventure = await queries.createAdventure(adventure, authorId);
  return persistedAdventure || null;
}

async function updateAdventure(adventure, authorId) {
  let persistedAdventure = await queries.updateAdventure(
    {
      ...adventure,
      genreId: adventure.genreId || (adventure.genre && adventure.genre.id),
    },
    authorId
  );

  return persistedAdventure || null;
}

async function getUserLibrary(userId) {
  const library = await queries.getUserLibrary(userId);
  return library || [];
}

module.exports = {
  getAdventures,
  getAdventure,
  getAdventuresByAuthor,
  createAdventure,
  updateAdventure,
  deleteDraftAdventure,
  getUserLibrary,
};
