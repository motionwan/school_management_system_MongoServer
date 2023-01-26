const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  registeredVoters: {
    type: Number,
    default: 0,
  },

  regionId: { type: toId, ref: 'region', required: true },
  // electionYearId: { type: toId, ref: 'season', required: true },
});

module.exports = mongoose.model('constituency', constituencySchema);
