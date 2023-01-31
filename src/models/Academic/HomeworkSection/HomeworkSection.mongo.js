const { format } = require('date-fns');
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const homeworkSectionSchema = new Schema({
  homeworkId: { type: toId, ref: 'Homework' },
  sectionId: { type: toId, ref: 'ClassSections' },
  createdAt: { type: String, default: format(Date.now(), 'do-MMM-yyyy') },
  updatedAt: { type: String, default: null },
});

module.exports = mongoose.model('HomeworkSection', homeworkSectionSchema);
