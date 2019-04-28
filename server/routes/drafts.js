const express = require('express');
const router = express.Router();
const adventureRepository = require('../repositories/AdventureRepository');
const Adventure = require('../models/Adventure');

router.get('/', (req, res) => {
  // Get the user id from the token
  const userId = 'something';
  const adventures = adventureRepository.getDraftAdventures(userId);
  res.json(adventures);
});

router.get('/:adventureId', (req, res) => {
  // Get the user id from the token
  const userId = 'something';
  const adventure = adventureRepository.getDraftAdventure(
    req.params.adventureId,
    userId,
  );
  res.json(adventure);
});

router.post('/', (req, res) => {
  const adventure = adventureRepository.createAdventure(req.body.title, 1);
  res.json(adventure);
});

module.exports = router;
