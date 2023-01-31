const express = require('express');
const router = express.Router();

const {
  updateHomework,
} = require('../../../controllers/Academic/Homework/Homework.controller');

router.put('/:id', updateHomework);

module.exports = router;
