const mockAdventure = require('../mock_data/example-adventure-rt.json');
const queries = require('../db/queries');

function getAdventures() {
  return [mockAdventure];
}

async function getAdventure(id) {
  const dbAdventure = await queries.getAdventure(id);
  if (dbAdventure) {
    return mapDbAdventureToAppAdventure(dbAdventure);
  }
  return null;
}

async function getDraftAdventures(userId) {
  const dbAdventures = await queries.getDrafts(userId);
  if (dbAdventures) {
    return dbAdventures.map(mapDbAdventureToAppAdventure);
  }
  // For now
  return [];
}

async function createAdventure(adventure, authorId) {
  let dbAdventure = await queries.createAdventure(adventure, authorId);
  if (dbAdventure) {
    return mapDbAdventureToAppAdventure(dbAdventure);
  }
  return null;
}

async function updateAdventure(adventure, authorId) {
  let dbAdventure = await queries.updateAdventure(adventure, authorId);
  if (dbAdventure) {
    return mapDbAdventureToAppAdventure(dbAdventure);
  }
  return null;
}

function mapDbAdventureToAppAdventure(dbAdventure) {
  return {
    id: dbAdventure.id,
    title: dbAdventure.title,
    published: dbAdventure.published,
    intro: dbAdventure.intro,
    mainStory: dbAdventure.main_story,
    items: dbAdventure.items,
  };
}

module.exports = {
  getAdventures,
  getAdventure,
  getDraftAdventures,
  createAdventure,
  updateAdventure,
};
