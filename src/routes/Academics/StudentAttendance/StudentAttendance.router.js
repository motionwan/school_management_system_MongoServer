const express = require('express');
const router = express.Router();

const {
  deleteAttendance,
  getallAttendance,
  takeAttendance,
  updateAttendance,
} = require('../../../controllers/Academic/StudentAttendance/StudentAttendance.controller');

router.get('/', getallAttendance);
router.post('/', takeAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
