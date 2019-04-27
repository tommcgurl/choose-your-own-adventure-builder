const express = require('express');
const router = express.Router();
const adventureRepository = require('../repositories/AdventureRepository');

router.get('/', (req, res) => {
  const adventures = adventureRepository.getAdventures();
  res.json(adventures);
});

router.get('/:adventureId', (req, res) => {
  const adventure = adventureRepository.getAdventure(req.params.adventureId);
  res.json(adventure);
});

module.exports = router;
