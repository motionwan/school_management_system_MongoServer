const express = require('express');
const router = express.Router();
const {
  getAllSchool,
  createNewSchool,
  deleteSchool,
  updateSchool,
} = require('../../../controllers/SchoolManagement/Schools/Schools.controller');

router.get('/', getAllSchool);
router.post('/', createNewSchool);
router.delete('/:id', deleteSchool);
router.put('/:id', updateSchool);

module.exports = router;
