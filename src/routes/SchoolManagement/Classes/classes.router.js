const express = require('express');
const router = express.Router();

const {
  deleteClass,
  updateClass,
  createNewClass,
  getAllClasses,
  //   classExists,
  //   findClassById,
} = require('../../../controllers/SchoolManagement/Classes/Classes.controller');

router.post('/', createNewClass);
router.get('/', getAllClasses);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

module.exports = router;
