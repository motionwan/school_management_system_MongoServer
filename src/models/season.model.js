const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seasonSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: { type: Date },
});

module.exports = mongoose.model('season', seasonSchema);
