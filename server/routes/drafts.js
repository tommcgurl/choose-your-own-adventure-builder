const express = require('express');
const router = express.Router();
const adventureRepository = require('../repositories/AdventureRepository');

router.get('/', (req, res) => {
  // Get the user id from the token
  const userId = 'something';
  const adventures = adventureRepository.getDraftAdventures(userId);
  res.json(adventures);
});

module.exports = router;
