const mockAdventures = require('../mock_data/mockAdventures');
const mockAdventure = require('../mock_data/example-adventure.json');

let bullshitId = 666;

class AdventureRepository {
  static getAdventures() {
    return mockAdventures;
  }

  static getAdventure(id) {
    return mockAdventure;
  }

  static getDraftAdventures(userId) {
    return [mockAdventure];
  }

  static getDraftAdventure(adventureId, userId) {
    return mockAdventure;
  }

  static createAdventure(adventure) {
    return adventure;
  }
}

module.exports = AdventureRepository;
