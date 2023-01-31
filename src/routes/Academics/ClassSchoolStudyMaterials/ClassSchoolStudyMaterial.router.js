const express = require('express');
const router = express.Router();
const {
  createClassSchoolStudyMaterial,
  getAllClassSchoolStudyMaterial,
  deleteClassSchoolStudyMaterial,
} = require('../../../controllers/Academic/ClassSchoolStudyMaterials/ClassSchoolStudyMaterial.controller');

router.post('/', createClassSchoolStudyMaterial);
router.get('/', getAllClassSchoolStudyMaterial);
router.delete('/:id', deleteClassSchoolStudyMaterial);

module.exports = router;
