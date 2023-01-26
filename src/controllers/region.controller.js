const Region = require('../models/region.model');
const defaultRegions = require('../models/data/regions');

const createRegion = async (req, res) => {
  try {
    const {
      name,
      code,
      registeredVoters,
      rejectedBallots,
      totalValidVotes,
      totalVoteCast,
      electionYearId,
    } = req.body;
    const region = await Region.create({
      name,
      code,
      registeredVoters,
      rejectedBallots,
      totalValidVotes,
      totalVoteCast,
      electionYearId,
    });
    return res.json(region);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.find({});
    return res.json(regions);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const deleteRegion = async (req, res) => {
  try {
    const regionId = req.params.id;
    const deletedRegion = await Region.findByIdAndDelete(regionId);
    res.json(deletedRegion);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const updateRegion = async (req, res) => {
  try {
    const regionId = req.params.id;
    const { name, code } = req.body;
    const updatedRegion = await Region.findByIdAndUpdate(regionId, {
      name,
      code,
    });
    return res.json(updatedRegion);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const countRegions = async (req, res) => {
  try {
    const numberOfRegions = await Region.count({});
    return res.json(numberOfRegions);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// create default regions
async function saveDefaultRegions() {
  saveDefaultClasses = () => {};
  const existingRegions = await Region.find({});
  if (existingRegions.length <= 1) {
    defaultRegions.map(async (defaultRegion) => {
      await Region.create({
        name: defaultRegion.name,
        code: defaultRegion.code,
      });
    });
  }
}
saveDefaultRegions();

module.exports = {
  createRegion,
  getAllRegions,
  updateRegion,
  deleteRegion,
  countRegions,
};
