const sampleAdventure = require('../mock_data/example-adventure-rt.1.json');
const queries = require('./queries');
const uuid = require('uuid/v4');

(async () => {
  const existingAdventure = await queries.getAdventure(sampleAdventure.id);
  if (!existingAdventure) {
    const testUser =
      (await queries.getUserByProviderId('test', 'test')) ||
      (await queries.createUser({ username: 'test' }, 'test', 'test'));
    await queries.updateUser(testUser.id, {
      ...testUser,
      bio: "I'm a test user!",
      photo: 'https://i.imgur.com/ZgzZzTC.jpg',
    });
    await queries.upsertAdventure(sampleAdventure, testUser.id);
    for (let i = 1; i < 1000; i++) {
      sampleAdventure.id = uuid();
      sampleAdventure.published = new Date();
      sampleAdventure.genre.id = getRandomInt(7);
      await queries.upsertAdventure(sampleAdventure, testUser.id);
    }
  }
})();

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max) + 1);
};
