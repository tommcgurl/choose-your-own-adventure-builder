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

function getDraftAdventures(userId) {
  return [mockAdventure];
}

function getDraftAdventure(adventureId, userId) {
  return mockAdventure;
}

async function createAdventure(adventure) {
  const dbAdventure = await queries.createAdventure(adventure);
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
  createAdventure,
  updateAdventure,
};
