const sampleAdventure = require('../mock_data/example-adventure-rt.json');
const queries = require('./queries');
const uuid = require('uuid/v4');

(async () => {
  const existingAdventure = await queries.getAdventure(sampleAdventure.id);
  if (!existingAdventure) {
    const dummyUser = await queries.createUser('test', 'test', 'test');
    await queries.upsertAdventure(sampleAdventure, dummyUser.id);
    for (let i = 0; i < 1000; i++) {
      sampleAdventure.id = uuid();
      sampleAdventure.published = new Date();
      sampleAdventure.genre.id = getRandomInt(7);
      await queries.upsertAdventure(sampleAdventure, dummyUser.id);
    }
  }
})();

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max) + 1);
};
