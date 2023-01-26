const Party = require('../models/party.model');

const createParty = async (req, res) => {
  try {
    const { name, abbreviation, color, electionYearId } = req.body;
    const party = await Party.create({
      name,
      abbreviation,
      color,
      electionYearId,
    });
    return res.json(party);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return res
        .status(500)
        .json({ error: 'A required field is missing please fill form again' });
    }
    return res.status(500).json({ err });
  }
};

const getAllParties = async (req, res) => {
  try {
    const parties = await Party.find({});
    return res.json(parties);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateParty = async (req, res) => {
  try {
    const { name, abbreviation } = req.body;
    const partyId = req.params.id;
    const updatedParty = await Party.findByIdAndUpdate(partyId, {
      name,
      abbreviation,
    });
    res.json(updatedParty);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const deleteParty = async (req, res) => {
  try {
    const partyId = req.params.id;
    const deletedParty = await Party.findByIdAndDelete(partyId);
    return res.json(deletedParty);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const countParties = async (req, res) => {
  try {
    const numberOfParties = await Party.count({});
    return res.json(numberOfParties);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createParty,
  getAllParties,
  updateParty,
  deleteParty,
  countParties,
};

//http://localhost:3001/party
