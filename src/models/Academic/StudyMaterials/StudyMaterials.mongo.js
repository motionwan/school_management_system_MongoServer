const { format } = require('date-fns');
const mongoose = require('mongoose');

const toId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;

const studyMaterialSchema = new Schema({
  label: {
    type: String,
    default: null,
    unique: true,
  },
  description: {
    type: String,
    default: null,
  },
  url: {
    type: String,
    default: null,
  },
  attachment: {
    type: String,
    default: null,
  },
  classSchoolStudyMaterialId: {
    type: toId,
    ref: 'ClassSchoolStudyMaterial',
  },
  schoolId: {
    type: toId,
    ref: 'School',
  },
  addedBy: {
    type: toId,
    ref: 'User',
  },

  createdAt: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
