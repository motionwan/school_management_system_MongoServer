const HomeworkSection = require('../../../models/Academic/HomeworkSection/HomeworkSection.mongo');
const Homework = require('../../../models/Academic/Homework/Homework.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getAllHomeworkSection = async (req, res) => {
  try {
    return res.json(await HomeworkSection.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createHomeworkSection = async (req, res) => {
  try {
    if (req.file) {
      const homework = {
        title: req.body.title,
        description: req.body.description,
        attachment: req.file.path,
        setBy: req.body.setBy,
        sessionId: req.body.sessionId,
        schoolId: req.body.schoolId,
      };
      const sectionId = req.body.sectionId;
      const newHomework = await Homework.create(homework);
      const homeworkId = ObjectId(newHomework._id);
      const homeworkSection = await HomeworkSection.create({
        homeworkId,
        sectionId,
      });
      const homeworkSectionId = ObjectId(homeworkSection._id);
      await Homework.findByIdAndUpdate(homeworkId, {
        homeworkSectionId: homeworkSectionId,
      });
      return res.json(homeworkSection);
    } else {
      const homework = {
        title: req.body.title,
        description: req.body.description,
        setBy: req.body.setBy,
        sessionId: req.body.sessionId,
        schoolId: req.body.schoolId,
      };
      const newHomework = await Homework.create(homework);
      const homeworkId = ObjectId(newHomework._id);
      const sectionId = ObjectId(req.body.sectionId);
      const homeworkSection = await HomeworkSection.create({
        homeworkId,
        sectionId,
      });
      const homeworkSectionId = ObjectId(homeworkSection._id);
      await Homework.findByIdAndUpdate(homeworkId, {
        homeworkSectionId: homeworkSectionId,
      });
      return res.json(homeworkSection);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const updateHomeworkSection = async (req, res) => {
  try {
    const id = req.params.id;
    const { sectionId, homeworkId } = req.body;
    return res.json(
      await updateHomeworkSection(id, {
        sectionId,
        homeworkId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteHomeworkSection = async (req, res) => {
  try {
    const id = req.params.id;
    await Homework.deleteOne({ homeworkSectionId: id });
    return res.json(await HomeworkSection.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createHomeworkSection,
  getAllHomeworkSection,
  updateHomeworkSection,
  deleteHomeworkSection,
};
