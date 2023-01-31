const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;
const { format } = require('date-fns');

const classSchoolSchema = new Schema({
  schoolId: { type: toId, ref: 'School' },
  classId: { type: toId, ref: 'Classes' },
  defaultSectionId: { type: toId, ref: 'ClassSection' },
  createdAt: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});

// create a section and assign it to class school if and only if the class is assigned

module.exports = mongoose.model('ClassSchool', classSchoolSchema);
