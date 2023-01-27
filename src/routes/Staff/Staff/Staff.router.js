const express = require('express');
const {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
} = require('../../../controllers/Staff/Staff/Staff.controller');
const router = express.Router();

router.post('/', createStaff);
router.get('/', getAllStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
