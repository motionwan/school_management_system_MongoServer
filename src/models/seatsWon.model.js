const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const seatsWonSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  // voteType: {
  //   type: String,
  //   // required: true,
  //   lowercase: true,
  // },
  //   constituencyVoteDetailsId: { type: toId, ref: 'ConstituencyVoteDetails' },
  //   regionalVoteDetailsId: { type: toId, ref: 'regionalVoteDetails' },
  //   nationalVoteDetailsId: { type: toId, ref: 'nationalVoteDetails' },
  //   uploadedBy: { type: toId, ref: 'user', required: true },
  //   pollingStationId: { type: toId, ref: 'pollingStation', required: true },
  partyId: { type: toId, ref: 'party', required: true },
  constituencyId: { type: toId, ref: 'constituency', required: true },
  regionId: { type: toId, ref: 'region', required: true },
  electionYearId: { type: toId, ref: 'season', required: true },
});

module.exports = mongoose.model('seatsWon', seatsWonSchema);
