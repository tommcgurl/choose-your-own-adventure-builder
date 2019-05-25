const sampleAdventure = require('../mock_data/example-adventure-rt.json');
const queries = require('./queries');

(async () => {
  const existingAdventure = await queries.getAdventure(sampleAdventure.id);
  if (!existingAdventure) {
    const dummyUser = await queries.createUser('test', 'test', 'test');
    await queries.createAdventure(sampleAdventure, dummyUser.id);
  }
})();
