const express = require('express');
const router = express.Router();
const {
  createParty,
  getAllParties,
  updateParty,
  deleteParty,
  countParties,
} = require('../controllers/party.controller');

router.post('/', createParty);
router.get('/', getAllParties);
router.get('/count', countParties);
router.put('/:id', updateParty);
router.delete('/:id', deleteParty);

module.exports = router;
