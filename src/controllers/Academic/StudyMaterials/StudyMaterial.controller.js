const StudyMaterial = require('../../../models/Academic/StudyMaterials/StudyMaterials.mongo');

// update study material
const updateStudyMaterials = async (req, res) => {
  try {
    const { id } = req.params; // study material id
    if (req.file) {
      const { label, url, schoolId, description } = req.body;
      const attachment = req.file.path;
      const studyMaterial = await StudyMaterial.findByIdAndUpdate(id, {
        label,
        url,
        attachment,
        schoolId,
        description,
      });
      return res.json(studyMaterial);
    } else {
      const { label, url, schoolId, description } = req.body;
      const studyMaterial = await StudyMaterial.findByIdAndUpdate(id, {
        label,
        url,
        schoolId,
        description,
      });
      return res.json(studyMaterial);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { updateStudyMaterials };
