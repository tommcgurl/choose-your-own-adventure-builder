const mockAdventures = require("../mock_data/mockAdventures");

class AdventureRepository {
  static getAdventures() {
    return mockAdventures;
  }
}

module.exports = AdventureRepository;
