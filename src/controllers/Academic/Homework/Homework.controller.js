const Homework = require('../../../models/Academic/Homework/Homework.mongo');

const updateHomework = async (req, res) => {
  try {
    const { id } = req.params;
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
      return res.json(await Homework.findByIdAndUpdate(id, homework));
    } else {
      const homework = {
        title: req.body.title,
        description: req.body.description,
        setBy: req.body.setBy,
        sessionId: req.body.session,
        schoolId: req.body.school,
        createdAt: req.body.createdAt,
      };
      return res.json(
        (updatedHomework = await Homework.findByIdAndUpdate(id, homework))
      );
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { updateHomework };
