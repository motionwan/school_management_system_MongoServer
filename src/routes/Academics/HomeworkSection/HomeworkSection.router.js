const express = require('express');
const router = express.Router();

const {
  createHomeworkSection,
  getAllHomeworkSection,
  updateHomeworkSection,
  deleteHomeworkSection,
} = require('../../../controllers/Academic/HomeworkSection/HomeworkSection.controller');

router.post('/', createHomeworkSection);
router.get('/', getAllHomeworkSection);
router.put('/:id', updateHomeworkSection);
router.delete('/:id', deleteHomeworkSection);

module.exports = router;
