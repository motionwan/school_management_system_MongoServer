const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const pollingStationVoteDetailSchema = new mongoose.Schema({
  rejectedBallots: { type: Number, default: 0 },
  totalValidVotes: { type: Number, default: 0 },
  voteType: { type: String, required: true },
  constituencyId: { type: toId, ref: 'constituency', required: true },
  regionId: { type: toId, ref: 'region', required: true },
  electionYearId: { type: toId, ref: 'season', required: true },
});

module.exports = mongoose.model(
  'ConstituencyVoteDetails',
  pollingStationVoteDetailSchema
);
