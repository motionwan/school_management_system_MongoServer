const {
  getAllHomeworkSections,
  createHomeworkSection,
  updateHomeworkSection,
  deleteHomeworkSection,
} = require('../../../models/Academic/homeworkSection/homeworkSection.model');

const httpGetAllHomeworkSection = async (req, res) => {
  try {
    return res.json(await getAllHomeworkSections());
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const httpCreateHomeworkSection = async (req, res) => {
  try {
    if (req.file) {
      const homework = {
        title: req.body.title,
        description: req.body.description,
        attachment: req.file.path,
        setBy: req.body.setBy,
        sessionId: req.body.session,
        schoolId: req.body.school,
        createdAt: req.body.createdAt,
      };
      const sectionId = req.body.sectionId;
      return res.json(await createHomeworkSection(homework, sectionId));
    } else {
      const homework = {
        title: req.body.title,
        description: req.body.description,
        setBy: req.body.setBy,
        sessionId: req.body.session,
        schoolId: req.body.school,
        createdAt: req.body.createdAt,
      };
      const sectionId = req.body.sectionId;
      return res.json(await createHomeworkSection(homework, sectionId));
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const httpUpdateHomeworkSection = async (req, res) => {
  try {
    const id = req.params.id;
    const homeworkSection = req.body;
    return res.json(await updateHomeworkSection(id, homeworkSection));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const httpDeleteHomeworkSection = async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await deleteHomeworkSection(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  httpCreateHomeworkSection,
  httpGetAllHomeworkSection,
  httpUpdateHomeworkSection,
  httpDeleteHomeworkSection,
};
