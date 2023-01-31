const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { format } = require('date-fns');

const TermSchema = new Schema({
  label: {
    type: String,
    required: true,
    default: null,
    unique: true,
  },
  startDate: {
    type: String,
    required: true,
    default: null,
  },
  endDate: {
    type: String,
    required: true,
    default: null,
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

module.exports = mongoose.model('Terms', TermSchema);
