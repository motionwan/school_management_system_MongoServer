const Vote = require('../models/vote.model');
const PollingStationVoteDetails = require('../models/pollingStationVoteDetails.model');
const ConstituencyVoteDetails = require('../models/constituencyVoteDetails.model');
const RegionalVoteDetails = require('../models/regionalVoteDetails.model');
const NationalVoteDetails = require('../models/nationalVoteDetails.model');
const SeatsWon = require('../models/seatsWon.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createVote = async (req, res) => {
  try {
    const {
      count,
      voteType,
      partyId,
      uploadedBy,
      rejectedBallots,
      pollingStationId,
      constituencyId,
      regionId,
      electionYearId,
    } = req.body;
    const vote = await Vote.create(
      //{ pollingStationId, electionYearId, voteType, uploadedBy },
      {
        count,
        voteType,
        partyId,
        uploadedBy,
        pollingStationId,
        constituencyId,
        regionId,
        electionYearId,
      }
      // { upsert: true }
    );

    // send data to polling station details
    await PollingStationVoteDetails.updateOne(
      { pollingStationId, voteType, electionYearId },
      {
        voteType,
        rejectedBallots,
        pollingStationId,
        constituencyId,
        regionId,
        electionYearId,
      },
      { upsert: true }
    );

    // add the polling station details together
    // and send it to the polling station vote details table

    const sumPollingStationVote = await Vote.aggregate([
      {
        $match: {
          pollingStationId: ObjectId(pollingStationId),
          electionYearId: ObjectId(electionYearId),
          voteType: voteType,
        },
      },
      {
        $group: {
          _id: {
            pollingStationId: '$pollingStationId',
            constituencyId: '$constituencyId',
            electionYearId: '$electionYearId',
            regionId: '$regionId',
            voteType: '$voteType',
          },
          totalValidVotes: { $sum: '$count' },
        },
      },
    ]);
    //console.log(sumPollingStationVote);

    sumPollingStationVote.map(async (pollingStationVote) => {
      await PollingStationVoteDetails.updateOne(
        {
          pollingStationId: pollingStationVote._id.pollingStationId,
          voteType: pollingStationVote._id.voteType,
          electionYearId: pollingStationVote._id.electionYearId,
        },
        {
          totalValidVotes: pollingStationVote.totalValidVotes,
          voteType: pollingStationVote._id.voteType,
          pollingStationId: pollingStationVote._id.pollingStationId,
          constituencyId: pollingStationVote._id.constituencyId,
          regionId: pollingStationVote._id.regionId,
          electionYearId: pollingStationVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    const pollingStationVoteDetails = await PollingStationVoteDetails.find({});
    const pollingStationVotes = await Vote.find({});

    pollingStationVoteDetails.map(async (details) => {
      pollingStationVotes.map(async (vote) => {
        if (
          vote.pollingStationId.equals(details.pollingStationId) &&
          vote.voteType === details.voteType &&
          vote.electionYearId.equals(details.electionYearId)
        ) {
          await Vote.findByIdAndUpdate(vote._id, {
            pollingStationVoteDetailsId: details._id,
          });
        }
      });
    });

    // add the polling station details together
    // and send it to the regional vote details table
    const sumConstituencyVote = await PollingStationVoteDetails.aggregate([
      {
        $match: {
          constituencyId: ObjectId(constituencyId),
          electionYearId: ObjectId(electionYearId),
          voteType: voteType,
        },
      },
      {
        $group: {
          _id: {
            constituencyId: '$constituencyId',
            regionId: '$regionId',
            voteType: '$voteType',
            electionYearId: '$electionYearId',
          },
          rejectedBallots: { $sum: '$rejectedBallots' },
          totalValidVotes: { $sum: '$totalValidVotes' },
        },
      },
    ]);

    sumConstituencyVote.map(async (constituencyVote) => {
      await ConstituencyVoteDetails.updateOne(
        {
          constituencyId: constituencyVote._id.constituencyId,
          voteType: constituencyVote._id.voteType,
          electionYearId: constituencyVote._id.electionYearId,
        },
        {
          rejectedBallots: constituencyVote.rejectedBallots,
          totalValidVotes: constituencyVote.totalValidVotes,
          voteType: constituencyVote._id.voteType,
          constituencyId: constituencyVote._id.constituencyId,
          regionId: constituencyVote._id.regionId,
          electionYearId: constituencyVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    const constituencyVoteDetails = await ConstituencyVoteDetails.find({});
    const constituencyVotes = await Vote.find({});
    // console.log(voteDetails);

    constituencyVoteDetails.map(async (details) => {
      constituencyVotes.map(async (vote) => {
        if (
          vote.constituencyId.equals(details.constituencyId) &&
          vote.voteType === details.voteType &&
          vote.electionYearId.equals(details.electionYearId)
        ) {
          await Vote.findByIdAndUpdate(vote._id, {
            constituencyVoteDetailsId: details._id,
          });
        }
      });
    });

    // add the polling station details together
    // and send it to the regional vote details table
    const sumRegionalVote = await ConstituencyVoteDetails.aggregate([
      {
        $match: {
          regionId: ObjectId(regionId),
          electionYearId: ObjectId(electionYearId),
          voteType: voteType,
        },
      },
      {
        $group: {
          _id: {
            regionId: '$regionId',
            voteType: '$voteType',
            electionYearId: '$electionYearId',
          },
          rejectedBallots: { $sum: '$rejectedBallots' },
          totalValidVotes: { $sum: '$totalValidVotes' },
        },
      },
    ]);
    //console.log(sumRegionalVote);

    sumRegionalVote.map(async (regionVote) => {
      await RegionalVoteDetails.updateOne(
        {
          regionId: regionVote._id.regionId,
          voteType: regionVote._id.voteType,
          electionYearId: regionVote._id.electionYearId,
        },
        {
          rejectedBallots: regionVote.rejectedBallots,
          totalValidVotes: regionVote.totalValidVotes,
          voteType: regionVote._id.voteType,
          regionId: regionVote._id.regionId,
          electionYearId: regionVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    const regionVoteDetails = await RegionalVoteDetails.find({});
    const regionVotes = await Vote.find({});

    regionVoteDetails.map(async (details) => {
      regionVotes.map(async (vote) => {
        if (
          vote.regionId.equals(details.regionId) &&
          vote.voteType === details.voteType &&
          vote.electionYearId.equals(details.electionYearId)
        ) {
          await Vote.findByIdAndUpdate(vote._id, {
            regionalVoteDetailsId: details._id,
          });
        }
      });
    });

    // add the polling station details together
    // and send it to the national vote details table

    const sumNationalVote = await RegionalVoteDetails.aggregate([
      {
        $match: {
          electionYearId: ObjectId(electionYearId),
          voteType: voteType,
        },
      },
      {
        $group: {
          _id: {
            voteType: '$voteType',
            electionYearId: '$electionYearId',
          },
          rejectedBallots: { $sum: '$rejectedBallots' },
          totalValidVotes: { $sum: '$totalValidVotes' },
        },
      },
    ]);

    sumNationalVote.map(async (nationalVote) => {
      await NationalVoteDetails.updateOne(
        {
          voteType: nationalVote._id.voteType,
          electionYearId: nationalVote._id.electionYearId,
        },
        {
          rejectedBallots: nationalVote.rejectedBallots,
          totalValidVotes: nationalVote.totalValidVotes,
          voteType: nationalVote._id.voteType,
          electionYearId: nationalVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    const nationalVoteDetails = await NationalVoteDetails.find({});
    const nationalVotes = await Vote.find({});
    // console.log(voteDetails);

    nationalVoteDetails.map(async (details) => {
      nationalVotes.map(async (vote) => {
        if (
          vote.electionYearId.equals(details.electionYearId) &&
          vote.voteType === details.voteType
        ) {
          await Vote.findByIdAndUpdate(vote._id, {
            nationalVoteDetailsId: details._id,
          });
        }
      });
    });
    // send data to total constituency votes to find seats won

    return res.json(vote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllVotes = async (req, res) => {
  try {
    const votes = await Vote.find({});
    return res.json(votes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
const deleteVotes = async (req, res) => {
  try {
    const voteId = req.params.id;
    // update vote details before delete

    const deletedVote = await Vote.findByIdAndDelete(voteId);
    // send data to polling station details
    // await PollingStationVoteDetails.updateOne(
    //   {
    //     pollingStationId: deletedVote.pollingStationId,
    //     voteType: deletedVote.voteType,
    //     electionYearId: deletedVote.electionYearId,
    //   },
    //   {
    //     voteType,
    //     rejectedBallots,
    //     pollingStationId,
    //     constituencyId,
    //     regionId,
    //     electionYearId,
    //   },
    //   { upsert: true }
    // );

    // add the polling station details together
    // and send it to the polling station vote details table

    const sumPollingStationVote = await Vote.aggregate([
      {
        $match: {
          // pollingStationId: ObjectId(deletedVote.pollingStationId),
          // electionYearId: ObjectId(deletedVote.electionYearId),
          // voteType: deletedVote.voteType,
        },
      },
      {
        $group: {
          _id: {
            pollingStationId: '$pollingStationId',
            constituencyId: '$constituencyId',
            electionYearId: '$electionYearId',
            regionId: '$regionId',
            voteType: '$voteType',
          },
          totalValidVotes: { $sum: '$count' },
        },
      },
    ]);
    //console.log(sumPollingStationVote);

    sumPollingStationVote.map(async (pollingStationVote) => {
      await PollingStationVoteDetails.updateOne(
        {
          pollingStationId: pollingStationVote._id.pollingStationId,
          voteType: pollingStationVote._id.voteType,
          electionYearId: pollingStationVote._id.electionYearId,
        },
        {
          totalValidVotes: pollingStationVote.totalValidVotes,
          voteType: pollingStationVote._id.voteType,
          pollingStationId: pollingStationVote._id.pollingStationId,
          constituencyId: pollingStationVote._id.constituencyId,
          regionId: pollingStationVote._id.regionId,
          electionYearId: pollingStationVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    const pollingStationVoteDetails = await PollingStationVoteDetails.find({});
    const pollingStationVotes = await Vote.find({});

    pollingStationVoteDetails.map(async (details) => {
      pollingStationVotes.map(async (vote) => {
        if (
          vote.pollingStationId.equals(details.pollingStationId) &&
          vote.voteType === details.voteType &&
          vote.electionYearId.equals(details.electionYearId)
        ) {
          await Vote.findByIdAndUpdate(vote._id, {
            pollingStationVoteDetailsId: details._id,
          });
        }
      });
    });

    // add the polling station details together
    // and send it to the regional vote details table
    const sumConstituencyVote = await PollingStationVoteDetails.aggregate([
      {
        $match: {
          // constituencyId: ObjectId(deletedVote.constituencyId),
          // electionYearId: ObjectId(deletedVote.electionYearId),
          // voteType: deletedVote.voteType,
        },
      },
      {
        $group: {
          _id: {
            constituencyId: '$constituencyId',
            regionId: '$regionId',
            voteType: '$voteType',
            electionYearId: '$electionYearId',
          },
          rejectedBallots: { $sum: '$rejectedBallots' },
          totalValidVotes: { $sum: '$totalValidVotes' },
        },
      },
    ]);

    sumConstituencyVote.map(async (constituencyVote) => {
      await ConstituencyVoteDetails.updateOne(
        {
          constituencyId: constituencyVote._id.constituencyId,
          voteType: constituencyVote._id.voteType,
          electionYearId: constituencyVote._id.electionYearId,
        },
        {
          rejectedBallots: constituencyVote.rejectedBallots,
          totalValidVotes: constituencyVote.totalValidVotes,
          voteType: constituencyVote._id.voteType,
          constituencyId: constituencyVote._id.constituencyId,
          regionId: constituencyVote._id.regionId,
          electionYearId: constituencyVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    const constituencyVoteDetails = await ConstituencyVoteDetails.find({});
    const constituencyVotes = await Vote.find({});
    // console.log(voteDetails);

    constituencyVoteDetails.map(async (details) => {
      constituencyVotes.map(async (vote) => {
        if (
          vote.constituencyId.equals(details.constituencyId) &&
          vote.voteType === details.voteType &&
          vote.electionYearId.equals(details.electionYearId)
        ) {
          await Vote.findByIdAndUpdate(vote._id, {
            constituencyVoteDetailsId: details._id,
          });
        }
      });
    });

    // add the polling station details together
    // and send it to the regional vote details table
    const sumRegionalVote = await ConstituencyVoteDetails.aggregate([
      {
        $match: {
          // regionId: ObjectId(deletedVote.regionId),
          // electionYearId: ObjectId(deletedVote.electionYearId),
          // voteType: deletedVote.voteType,
        },
      },
      {
        $group: {
          _id: {
            regionId: '$regionId',
            voteType: '$voteType',
            electionYearId: '$electionYearId',
          },
          rejectedBallots: { $sum: '$rejectedBallots' },
          totalValidVotes: { $sum: '$totalValidVotes' },
        },
      },
    ]);
    //console.log(sumRegionalVote);

    sumRegionalVote.map(async (regionVote) => {
      await RegionalVoteDetails.updateOne(
        {
          regionId: regionVote._id.regionId,
          voteType: regionVote._id.voteType,
          electionYearId: regionVote._id.electionYearId,
        },
        {
          rejectedBallots: regionVote.rejectedBallots,
          totalValidVotes: regionVote.totalValidVotes,
          voteType: regionVote._id.voteType,
          regionId: regionVote._id.regionId,
          electionYearId: regionVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    const regionVoteDetails = await RegionalVoteDetails.find({});
    const regionVotes = await Vote.find({});

    regionVoteDetails.map(async (details) => {
      regionVotes.map(async (vote) => {
        if (
          vote.regionId.equals(details.regionId) &&
          vote.voteType === details.voteType &&
          vote.electionYearId.equals(details.electionYearId)
        ) {
          await Vote.findByIdAndUpdate(vote._id, {
            regionalVoteDetailsId: details._id,
          });
        }
      });
    });

    // add the polling station details together
    // and send it to the national vote details table

    const sumNationalVote = await RegionalVoteDetails.aggregate([
      {
        $match: {
          // electionYearId: ObjectId(deletedVote.electionYearId),
          // voteType: deletedVote.voteType,
        },
      },
      {
        $group: {
          _id: {
            voteType: '$voteType',
            electionYearId: '$electionYearId',
          },
          rejectedBallots: { $sum: '$rejectedBallots' },
          totalValidVotes: { $sum: '$totalValidVotes' },
        },
      },
    ]);

    sumNationalVote.map(async (nationalVote) => {
      await NationalVoteDetails.updateOne(
        {
          voteType: nationalVote._id.voteType,
          electionYearId: nationalVote._id.electionYearId,
        },
        {
          rejectedBallots: nationalVote.rejectedBallots,
          totalValidVotes: nationalVote.totalValidVotes,
          voteType: nationalVote._id.voteType,
          electionYearId: nationalVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    const nationalVoteDetails = await NationalVoteDetails.find({});
    const nationalVotes = await Vote.find({});
    // console.log(voteDetails);

    nationalVoteDetails.map(async (details) => {
      nationalVotes.map(async (vote) => {
        if (
          vote.electionYearId.equals(details.electionYearId) &&
          vote.voteType === details.voteType
        ) {
          await Vote.findByIdAndUpdate(vote._id, {
            nationalVoteDetailsId: details._id,
          });
        }
      });
    });
    // send data to total constituency votes to find seats won
    const uploadConstituencySeatWon = await Vote.aggregate([
      {
        $match: {
          electionYearId: ObjectId(deletedVote.electionYearId),
          // voteType: 'parliamentary',
        },
      },
      {
        $group: {
          _id: {
            constituencyId: '$constituencyId',
            partyId: '$partyId',
            regionId: '$regionId',
            electionYearId: '$electionYearId',
            //voteType: '$parliamentary',
          },
          count: { $sum: '$count' },
          // totalValidVotes: { $sum: '$totalValidVotes' },
        },
      },
    ]);
    //console.log(sumRegionalVote);

    uploadConstituencySeatWon.map(async (totalConstituencyVote) => {
      await SeatsWon.updateOne(
        {
          constituencyId: totalConstituencyVote._id.constituencyId,
          partyId: totalConstituencyVote._id.partyId,
          electionYearId: totalConstituencyVote._id.electionYearId,
        },
        {
          count: totalConstituencyVote.count,
          voteType: totalConstituencyVote._id.voteType,
          regionId: totalConstituencyVote._id.regionId,
          constituencyId: totalConstituencyVote._id.constituencyId,
          electionYearId: totalConstituencyVote._id.electionYearId,
        },
        { upsert: true }
      );
    });

    return res.json(deletedVote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
const updateVotes = async (req, res) => {
  try {
    const voteId = req.params.id;
    const { count } = req.body;
    const updatedVote = await Vote.findByIdAndUpdate(voteId, { count });
    return res.json(updatedVote);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getVoteTypes = async (req, res) => {
  try {
    const { electionYearId, voteType } = req.body;
    const votes = await Vote.find({ voteType, electionYearId });
    return res.json(votes);
  } catch (err) {
    console.log(err);
    return res.status.json({ error: err.message });
  }
};

// get votes for a particular polling station
const getPollingStationVotes = async (req, res) => {
  try {
    const pollingStationId = req.params.id;
    const { voteType, electionYearId } = req.body;
    const pollingStationVotes = await Vote.aggregate([
      {
        $match: {
          pollingStationId: ObjectId(pollingStationId),
          electionYearId: ObjectId(electionYearId),
          voteType: voteType,
        },
      },
      {
        $group: {
          _id: {
            pollingStationId: '$pollingStationId',
            voteType: '$voteType',
            pollingStationVoteDetailsId: '$pollingStationVoteDetailsId',
            partyId: '$partyId',
          },
          totalVoteGained: { $sum: '$count' },
        },
      },
      {
        $lookup: {
          from: 'parties',
          localField: '_id.partyId',
          foreignField: '_id',
          as: 'party',
        },
      },
      {
        $lookup: {
          from: 'pollingstations',
          localField: '_id.pollingStationId',
          foreignField: '_id',
          as: 'pollingStation',
        },
      },
      {
        $lookup: {
          from: 'pollingstationvotedetails',
          localField: '_id.pollingStationVoteDetailsId',
          foreignField: '_id',
          as: 'voteDetails',
        },
      },
      { $unwind: { path: '$voteDetails' } },
      { $unwind: { path: '$party' } },
      { $unwind: { path: '$pollingStation' } },
    ]);

    return res.json(pollingStationVotes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// find all the vote for a particular constituency
const getConstituencyVotes = async (req, res) => {
  try {
    const constituencyId = req.params.id;
    const { voteType, electionYearId } = req.body;

    const constituencyVotes = await Vote.aggregate([
      {
        $match: {
          constituencyId: ObjectId(constituencyId),
          electionYearId: ObjectId(electionYearId),
          voteType: voteType,
        },
      },
      {
        $group: {
          _id: {
            constituencyId: '$constituencyId',
            voteType: '$voteType',
            constituencyVoteDetailsId: '$constituencyVoteDetailsId',
            partyId: '$partyId',
          },
          totalVoteGained: { $sum: '$count' },
        },
      },
      {
        $lookup: {
          from: 'constituencies',
          localField: '_id.constituencyId',
          foreignField: '_id',
          as: 'constituency',
        },
      },
      {
        $lookup: {
          from: 'parties',
          localField: '_id.partyId',
          foreignField: '_id',
          as: 'party',
        },
      },
      {
        $lookup: {
          from: 'constituencyvotedetails',
          localField: '_id.constituencyVoteDetailsId',
          foreignField: '_id',
          as: 'voteDetails',
        },
      },
      { $unwind: { path: '$voteDetails' } },
      { $unwind: { path: '$party' } },
      { $unwind: { path: '$constituency' } },
    ]);

    return res.json(constituencyVotes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}; // end of constituency vote function

const getRegionalVotes = async (req, res) => {
  try {
    const regionId = req.params.id;
    const { voteType, electionYearId } = req.body;

    const regionalVotes = await Vote.aggregate([
      {
        $match: {
          regionId: ObjectId(regionId),
          electionYearId: ObjectId(electionYearId),
          voteType: voteType,
        },
      },
      {
        $group: {
          _id: {
            regionId: '$regionId',
            regionalVoteDetailsId: '$regionalVoteDetailsId',
            partyId: '$partyId',
          },
          totalVotesGained: { $sum: '$count' },
        },
      },
      {
        $lookup: {
          from: 'regions',
          localField: '_id.regionId',
          foreignField: '_id',
          as: 'region',
        },
      },
      {
        $lookup: {
          from: 'parties',
          localField: '_id.partyId',
          foreignField: '_id',
          as: 'party',
        },
      },
      {
        $lookup: {
          from: 'regionalvotedetails',
          localField: '_id.regionalVoteDetailsId',
          foreignField: '_id',
          as: 'voteDetails',
        },
      },
      { $unwind: { path: '$voteDetails' } },
      { $unwind: { path: '$party' } },
      { $unwind: { path: '$region' } },
    ]);

    return res.json(regionalVotes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// get all national Regional vote by region's Id
const getNationalVoteDetails = async (req, res) => {
  const { electionYearId, voteType } = req.body;

  const getNationalVote = await Vote.aggregate([
    {
      $match: {
        voteType: voteType,
        electionYearId: ObjectId(electionYearId),
      },
    },
    {
      $group: {
        _id: {
          partyId: '$partyId',
          nationalVoteDetailsId: '$nationalVoteDetailsId',
        },
        totalVotesGained: { $sum: '$count' },
      },
    },
    {
      $lookup: {
        from: 'parties',
        localField: '_id.partyId',
        foreignField: '_id',
        as: 'party',
      },
    },
    {
      $lookup: {
        from: 'nationalvotedetails',
        localField: '_id.nationalVoteDetailsId',
        foreignField: '_id',
        as: 'voteDetails',
      },
    },
    { $unwind: { path: '$party' } },
    { $unwind: { path: '$voteDetails' } },
  ]);

  return res.json(getNationalVote);
};

const getVotesByElectionYear = async (req, res) => {
  try {
    const { electionYearId, voteType } = req.body;
    const votesByElectionYear = await Vote.find({
      electionYearId,
      voteType,
    })
      .populate('pollingStationId')
      .populate('partyId')
      .populate('constituencyId');
    return res.json(votesByElectionYear);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getNumberOfSeatsWon = async (req, res) => {
  //const voteType = 'presidential';
  const electionYearId = req.params.id;
  const seatsWon = await Vote.aggregate([
    { $match: { electionYearId: ObjectId(electionYearId) } },
    {
      $group: {
        _id: {
          constituencyId: '$constituencyId',
          partyId: '$partyId',
          electionYearId: '$electionYearId',
          regionId: '$regionId',
          voteType: 'parliamentary',
        },
        votes: { $sum: '$count' },
      },
    },
  ]);
  let data = seatsWon;
  let result = data.reduce((acc, curr) => {
    const { constituencyId } = curr._id;
    if (!acc[constituencyId]) {
      acc[constituencyId] = {
        constituencyId: curr._id.constituencyId,
        partyId: curr._id.partyId,
        electionYearId: curr._id.electionYearId,
        regionId: curr._id.regionId,
        votes: curr.votes,
      };
    } else {
      if (curr.votes > acc[constituencyId].votes) {
        acc[constituencyId] = {
          constituencyId: curr._id.constituencyId,
          partyId: curr._id.partyId,
          electionYearId: curr._id.electionYearId,
          regionId: curr._id.regionId,
          votes: curr.votes,
        };
      }
    }
    return acc;
  }, {});
  const myResult = [result];
  console.log(myResult);
  myResult.map((result) => {
    return Object.values(result).map(async (val) => {
      console.log(val);
      await SeatsWon.updateOne(
        {
          constituencyId: val.constituencyId,
          electionYearId: val.electionYearId,
        },
        {
          count: val.votes,
          electionYearId: val.electionYearId,
          regionId: val.regionId,
          constituencyId: val.constituencyId,
        },
        { upsert: true }
      );
    });
  });
  // query the seatswons table match by election year id and group by party id and count

  return res.json([result]);
};

module.exports = {
  createVote,
  getAllVotes,
  updateVotes,
  deleteVotes,
  getVoteTypes,
  getPollingStationVotes,
  getConstituencyVotes,
  getRegionalVotes,
  getNationalVoteDetails,
  getVotesByElectionYear,
  getNumberOfSeatsWon,
};
