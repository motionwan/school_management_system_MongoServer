const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const voteSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  voteType: {
    type: String,
    required: true,
    lowercase: true,
  },
  pollingStationVoteDetailsId: { type: toId, ref: 'pollingStationVoteDetails' },
  constituencyVoteDetailsId: { type: toId, ref: 'ConstituencyVoteDetails' },
  regionalVoteDetailsId: { type: toId, ref: 'regionalVoteDetails' },
  nationalVoteDetailsId: { type: toId, ref: 'nationalVoteDetails' },
  uploadedBy: { type: toId, ref: 'user', required: true },
  partyId: { type: toId, ref: 'party', required: true },
  pollingStationId: { type: toId, ref: 'pollingStation', required: true },
  constituencyId: { type: toId, ref: 'constituency', required: true },
  regionId: { type: toId, ref: 'region', required: true },
  electionYearId: { type: toId, ref: 'season', required: true },
});

module.exports = mongoose.model('vote', voteSchema);
