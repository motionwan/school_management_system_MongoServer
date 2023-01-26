const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const pollingStationSchema = new mongoose.Schema({
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
    required: true,
  },

  constituencyId: {
    type: toId,
    ref: 'constituency',
  },
  regionId: { type: toId, ref: 'region', required: true },
  // electionYearId: { type: toId, ref: 'season', required: true },
});

module.exports = mongoose.model('pollingStation', pollingStationSchema);
