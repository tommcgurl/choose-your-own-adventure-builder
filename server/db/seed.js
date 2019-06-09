const sampleAdventure = require('../mock_data/example-adventure-rt.json');
const queries = require('./queries');
const uuid = require('uuid/v4');

(async () => {
  const existingAdventure = await queries.getAdventure(sampleAdventure.id);
  if (!existingAdventure) {
    const dummyUser = await queries.createUser('test', 'test', 'test');
    await queries.createAdventure(sampleAdventure, dummyUser.id);
    for (let i = 0; i < 1000; i++) {
      sampleAdventure.id = uuid();
      sampleAdventure.published = new Date();
      sampleAdventure.genreId = getRandomInt(7);
      await queries.createAdventure(sampleAdventure, dummyUser.id);
    }
  }
})();

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max) + 1);
};
