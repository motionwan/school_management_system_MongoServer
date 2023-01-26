const PollingStation = require('../models/pollingStation.model');

const createPollingStation = async (req, res) => {
  try {
    const {
      name,
      code,
      registeredVoters,
      rejectedBallots,
      totalValidVotes,
      totalVoteCast,
      constituencyId,
      regionId,
      electionYearId,
    } = req.body;
    const pollingStation = await PollingStation.create({
      name,
      code,
      registeredVoters,
      rejectedBallots,
      totalValidVotes,
      totalVoteCast,
      constituencyId,
      regionId,
      electionYearId,
    });
    return res.json(pollingStation);
  } catch (err) {
    console.log(err.message);
    if (err.name === 'ValidationError') {
      return res.status(500).json({
        error: 'A required field has been left empty please update form',
      });
    }
    return res.status(500).json({ error: err });
  }
};

const countPollingStation = async (req, res) => {
  try {
    const numberOfPollingStations = await PollingStation.count({});
    return res.json(numberOfPollingStations);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getRegionsPollingStation = async (req, res) => {
  try {
    const regionId = req.params.id;
    //const { electionYearId } = req.body;
    const regionalPollingStations = await PollingStation.find({
      regionId,
      // electionYearId,
    });
    return res.json(regionalPollingStations);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
const getConstituencyPollingStation = async (req, res) => {
  try {
    const constituencyId = req.params.id;
    //const { electionYearId } = req.body;
    const constituencyPollingStation = await PollingStation.find({
      constituencyId,
      // electionYearId,
    });
    //console.log(constituencyId);
    return res.json(constituencyPollingStation);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllPollingStations = async (req, res) => {
  try {
    const pollingStations = await PollingStation.find({});
    return res.json(pollingStations);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const updatePollingStation = async (req, res) => {
  try {
    const pollingStationId = req.params.id;
    const { code, registeredVoters, name, regionId, constituencyId } = req.body;
    const updatedPollingStation = await PollingStation.findByIdAndUpdate(
      pollingStationId,
      { name, code, registeredVoters, regionId, constituencyId }
    );
    return res.json(updatedPollingStation);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const deletePollingStation = async (req, res) => {
  try {
    const pollingStationId = req.params.id;
    const deletedPollingStation = await PollingStation.findByIdAndDelete(
      pollingStationId
    );
    return res.json(deletedPollingStation);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllPollingStationByYear = async (req, res) => {
  try {
    const { electionYearId } = req.body;
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPollingStation,
  countPollingStation,
  getRegionsPollingStation,
  getConstituencyPollingStation,
  getAllPollingStations,
  updatePollingStation,
  deletePollingStation,
};

//http://localhost:3001/polling_station/count
