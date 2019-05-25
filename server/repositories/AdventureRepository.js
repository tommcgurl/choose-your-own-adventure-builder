const mockAdventures = require('../mock_data/mockAdventures');
// const mockAdventure = require("../mock_data/example-adventure.json");
const mockAdventure = require('../mock_data/example-adventure-rt.json');
const queries = require('../db/queries');

function getAdventures() {
  // return mockAdventures;
  return [mockAdventure];
}

function getAdventure(id) {
  return mockAdventure;
}

async function getDraftAdventures(userId) {
  // return [mockAdventure];
  const dbAdventures = await queries.getDrafts(userId);
  if (dbAdventures) {
    return dbAdventures.map(mapDbAdventureToAppAdventure);
  }
  // For now
  return [];
}

function getDraftAdventure(adventureId, userId) {
  return mockAdventure;
}

async function createOrUpdateAdventure(adventure, authorId) {
  const existingAdventure = await queries.getAdventure(adventure.id);

  let dbAdventure = existingAdventure
    ? await queries.updateAdventure(adventure, authorId)
    : await queries.createAdventure(adventure, authorId);

  if (dbAdventure) {
    return mapDbAdventureToAppAdventure(dbAdventure);
  }
  return null;
}

function updateAdventure(adventure) {
  return adventure;
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
  getDraftAdventure,
  createOrUpdateAdventure,
  updateAdventure,
};
