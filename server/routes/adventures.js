const express = require("express");
const router = express.Router();
const adventureRepository = require("../repositories/AdventureRepository");

router.get("/", (req, res) => {
  const adventures = adventureRepository.getAdventures();
  res.json({ adventures });
});

module.exports = router;
