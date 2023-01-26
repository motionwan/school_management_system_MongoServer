const express = require('express');
const router = express.Router();
const {
  createVote,
  getAllVotes,
  updateVotes,
  deleteVotes,
  getVoteTypes,
  getConstituencyVotes,
  getPollingStationVotes,
  getRegionalVotes,
  getNationalVoteDetails,
  getVotesByElectionYear,
  getSeatsWon,
} = require('../controllers/vote.controller');

router.post('/', createVote);
router.get('/', getAllVotes);
router.put('/:Id', updateVotes);
router.delete('/:id', deleteVotes);
router.post('/admin', getVoteTypes);
router.post('/constituency_votes/:id', getConstituencyVotes);
router.post('/polling_station_votes/:id', getPollingStationVotes);
router.post('/regional_votes/:id', getRegionalVotes);
router.post('/national_vote', getNationalVoteDetails);
router.post('/vote_by_year', getVotesByElectionYear);
router.get('/seats_won', getSeatsWon);

module.exports = router;
