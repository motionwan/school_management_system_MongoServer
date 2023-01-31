const express = require('express');
const {
  updateStudyMaterials,
} = require('../../../controllers/Academic/StudyMaterials/StudyMaterial.controller');
const router = express.Router();

router.put('/', updateStudyMaterials);

module.exports = router;
