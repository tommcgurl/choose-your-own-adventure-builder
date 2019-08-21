module.exports = {
  getUserByProviderId: require('./getUserByProviderId'),
  createUser: require('./createUser'),
  getDraftsByAuthor: require('./getDraftsByAuthor'),
  getPublishedAdventuresByAuthor: require('./getPublishedAdventuresByAuthor'),
  getAuthors: require('./getAuthors'),
  getAdventure: require('./getAdventure'),
  getPaginatedPublishedAdventures: require('./getPaginatedPublishedAdventures'),
  deleteAdventureReader: require('./deleteAdventureReader'),
  deleteDraft: require('./deleteDraft'),
  getGenres: require('./getGenres'),
  getGenre: require('./getGenre'),
  getUserLibrary: require('./getUserLibrary'),
  upsertAdventure: require('./upsertAdventure'),
  upsertAdventureReader: require('./upsertAdventureReader'),
  getProgress: require('./getProgress'),
  getUserByUsername: require('./getUserByUsername'),
  updateUser: require('./updateUser'),
  getUserById: require('./getUserById'),
  getUserByEmail: require('./getUserByEmail'),
  insertAuthProviderInfo: require('./insertAuthProviderInfo'),
};
