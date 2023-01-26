const mongoose = require('mongoose');
//const toId = mongoose.Types.ObjectId;

const regionSchema = new mongoose.Schema({
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
  rejectedBallots: {
    type: Number,
    default: 0,
  },
  totalValidVotes: {
    type: Number,
    default: 0,
  },
  totalVoteCast: {
    type: Number,
    default: 0,
  },

  //electionYearId: { type: toId, ref: 'season' },
});

module.exports = mongoose.model('region', regionSchema);
