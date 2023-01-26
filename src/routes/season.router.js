const express = require('express');
const router = express.Router();
const {
  createSeason,
  getAllSeasons,
} = require('../controllers/season.controller');

router.post('/', createSeason);
router.get('/', getAllSeasons);

module.exports = router;
