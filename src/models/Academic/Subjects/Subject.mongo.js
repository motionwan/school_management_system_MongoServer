const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;
const { format } = require('date-fns');

const subjectSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  code: { type: String, required: true, default: null },
  type: { type: String, required: true, default: null },
  classSchoolId: { type: toId, ref: 'ClassSchool' },
  createdAt: {
    type: String,
    required: true,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: { type: String, default: null },
});

module.exports = mongoose.model('Subject', subjectSchema);
