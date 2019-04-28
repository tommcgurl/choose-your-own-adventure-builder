const express = require('express');
const router = express.Router();
const adventureRepository = require('../repositories/AdventureRepository');

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
  const adventure = adventureRepository.createAdventure(req.body);
  res.json(adventure);
});

router.put('/:adventureId', (req, res) => {
  if (req.body.id === req.params.adventureId) {
    // Also check the token's userId against the authorIds somehow
    const adventure = adventureRepository.updateAdventure(req.body);
    res.json(adventure);
  } else {
    res.status(400).send('Bad Request');
  }
});

module.exports = router;
