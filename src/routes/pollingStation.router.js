const express = require('express');
const router = express.Router();
const {
  createPollingStation,
  countPollingStation,
  getRegionsPollingStation,
  getConstituencyPollingStation,
  getAllPollingStations,
  updatePollingStation,
  deletePollingStation,
} = require('../controllers/pollingStation.controller');

router.post('/', createPollingStation);
router.get('/', getAllPollingStations);
router.put('/:id', updatePollingStation);
router.delete('/:id', deletePollingStation);
router.get('/count', countPollingStation);
router.get('/region/:id', getRegionsPollingStation);
router.get('/constituency/:id', getConstituencyPollingStation);

module.exports = router;
