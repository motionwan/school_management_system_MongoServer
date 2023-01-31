const express = require('express');
const router = express.Router();

const {
  httpCreateSubjects,
  httpFindAllSubjects,
  httpUpdateSubject,
  httpDeleteSubject,
} = require('../../../controllers/Academic/Subjects/Subject.controller');

router.post('/', httpCreateSubjects);
router.get('/', httpFindAllSubjects);
router.put('/:id', httpUpdateSubject);
router.delete('/:id', httpDeleteSubject);

module.exports = router;
