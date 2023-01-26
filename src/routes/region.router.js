const express = require('express');
const router = express.Router();
const {
  createRegion,
  getAllRegions,
  updateRegion,
  deleteRegion,
  countRegions,
} = require('../controllers/region.controller');

router.post('/', createRegion);
router.get('/', getAllRegions);
router.put('/:id', updateRegion);
router.delete('/:id', deleteRegion);
router.get('/count', countRegions);

module.exports = router;
