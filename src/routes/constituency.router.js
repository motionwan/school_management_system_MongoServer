const express = require('express');
const router = express.Router();
const {
  createConstituency,
  getAllConstituencies,
  updateConstituency,
  deleteConstituency,
  countConstituency,
  getConstituencyForRegions,
} = require('../controllers/constituency.controller');

router.post('/', createConstituency);
router.get('/', getAllConstituencies);
router.put('/:id', updateConstituency);
router.delete('/:id', deleteConstituency);
router.get('/count', countConstituency);
router.get('/region/:id', getConstituencyForRegions);

module.exports = router;
