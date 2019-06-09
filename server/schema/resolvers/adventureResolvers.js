const userRepository = require('../../repositories/UserRepository');
const genreRepository = require('../../repositories/genreRepository');

module.exports = {
  Adventure: {
    authors: parent => userRepository.getAuthorsOfAdventure(parent.id),
    genre: parent => genreRepository.getGenre(parent.genreId),
  },
};
