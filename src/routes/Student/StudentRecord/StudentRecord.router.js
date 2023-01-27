const express = require('express');
const router = express.Router();

const {
  admitStudent,
  //deActivateStudent,
  updateStudent,
  getAllStudents,
  deleteStudent,
} = require('../../../controllers/Students/StudentRecord/StudentRecord.controller');

router.post('/', admitStudent);
//router.put('/deactivate/:id', deActivateStudent);
router.put('/:id', updateStudent);
router.get('/', getAllStudents);
router.delete('/:id', deleteStudent);

module.exports = router;
