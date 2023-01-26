const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const regionalVoteDetailsSchema = new mongoose.Schema({
  rejectedBallots: { type: Number, default: 0 },
  totalValidVotes: { type: Number, default: 0 },
  voteType: { type: String, required: true },
  regionId: { type: toId, ref: 'region', required: true },
  electionYearId: { type: toId, ref: 'season', required: true },
});

module.exports = mongoose.model(
  'regionalVoteDetails',
  regionalVoteDetailsSchema
);
