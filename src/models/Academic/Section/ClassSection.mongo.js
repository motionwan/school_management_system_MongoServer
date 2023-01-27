const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;
const { format } = require('date-fns');

const classSectionSchema = new Schema({
  label: {
    type: String,
    default: null,
    required: true,
  },
  classSchoolId: { type: toId, ref: 'ClassSchool' },
  createdAt: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    // default: null,
  },
});

module.exports = mongoose.model('ClassSection', classSectionSchema);
