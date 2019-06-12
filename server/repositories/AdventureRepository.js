const queries = require('../db/queries');

async function getAdventures(first, publishedBefore) {
  const dbAdventures = await queries.getPublishedAdventures(
    first,
    publishedBefore
  );
  if (dbAdventures) {
    return dbAdventures.map(mapDbAdventureToAppAdventure);
  }
  return [];
}

async function getAdventure(id) {
  const dbAdventure = await queries.getAdventure(id);
  if (dbAdventure) {
    return mapDbAdventureToAppAdventure(dbAdventure);
  }
  return null;
}

async function getAdventuresByAuthor(userId) {
  const dbAdventures = await queries.getAdventuresByAuthor(userId);
  if (dbAdventures) {
    return dbAdventures.map(mapDbAdventureToAppAdventure);
  }
  // For now
  return [];
}

async function deleteDraftAdventure(draftId) {
  await queries.deleteDraft(draftId);
}

async function createAdventure(adventure, authorId) {
  let dbAdventure = await queries.createAdventure(adventure, authorId);
  if (dbAdventure) {
    return mapDbAdventureToAppAdventure(dbAdventure);
  }
  return null;
}

async function updateAdventure(adventure, authorId) {
  let dbAdventure = await queries.updateAdventure(
    {
      ...adventure,
      genreId: adventure.genreId || (adventure.genre && adventure.genre.id),
    },
    authorId
  );
  if (dbAdventure) {
    return mapDbAdventureToAppAdventure(dbAdventure);
  }
  return null;
}

async function getUserLibrary(userId) {
  const library = await queries.getUserLibrary(userId);
  if (library) {
    return library.map(mapDbAdventureToAppAdventure);
  }
  // For now...
  return [];
}

function mapDbAdventureToAppAdventure(dbAdventure) {
  return {
    id: dbAdventure.id,
    title: dbAdventure.title,
    published: dbAdventure.published,
    intro: dbAdventure.intro,
    mainStory: dbAdventure.main_story,
    items: dbAdventure.items,
    genreId: dbAdventure.genre_id,
  };
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
