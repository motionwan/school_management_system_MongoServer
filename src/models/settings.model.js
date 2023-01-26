const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const settingsSchema = new Schema({
  currentElectionYear: {
    type: toId,
    required: true,
    ref: 'season',
    unique: true,
  },
  up: { type: Number, required: true },
});

module.exports = mongoose.model('setting', settingsSchema);
