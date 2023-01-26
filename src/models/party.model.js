const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  abbreviation: {
    type: String,
    required: true,
    lowercase: true,
  },
  color: {
    type: String,
    required: true,
    lowercase: true,
  },
  electionYearId: { type: toId, ref: 'season', required: true },
});

module.exports = mongoose.model('party', partySchema);
