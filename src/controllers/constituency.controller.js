const Constituency = require('../models/constituency.model');
//const defaultConstituencies = require('../models/data/constituencies.data');

const createConstituency = async (req, res) => {
  try {
    const {
      name,
      code,
      registeredVoters,
      rejectedBallots,
      totalValidVotes,
      totalVoteCast,
      regionId,
      electionYearId,
    } = req.body;
    const constituency = await Constituency.create({
      name,
      code,
      registeredVoters,
      rejectedBallots,
      totalValidVotes,
      totalVoteCast,
      regionId,
      electionYearId,
    });
    return res.json(constituency);
  } catch (err) {
    console.log(err.message);
    if (err.name === 'ValidationError') {
      return res.status(500).json({
        error: 'A required field has been left out please fill form again',
      });
    }
    return res.status(500).json({ error: err.message });
  }
};

const getAllConstituencies = async (req, res) => {
  try {
    const constituencies = await Constituency.find({});
    return res.json(constituencies);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const updateConstituency = async (req, res) => {
  try {
    const constituencyId = req.params.id;
    const { name, code, regionId } = req.body;
    const updatedConstituency = await Constituency.findByIdAndUpdate(
      constituencyId,
      { name, code, regionId }
    );
    return res.json(updatedConstituency);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteConstituency = async (req, res) => {
  try {
    const constituencyId = req.params.id;
    const deletedConstituency = await Constituency.findByIdAndDelete(
      constituencyId
    );
    return res.json(deletedConstituency);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const countConstituency = async (req, res) => {
  try {
    const numberOfConstituencies = await Constituency.count({});
    return res.json(numberOfConstituencies);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getConstituencyForRegions = async (req, res) => {
  try {
    const regionId = req.params.id;
    const regionalConstituencies = await Constituency.find({
      regionId: regionId,
    });
    return res.json(regionalConstituencies);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// // create default constituencies
// async function saveDefaultConstituencies() {
//   saveDefaultClasses = () => {};
//   const existingConstituencies = await Constituency.find({});
//   if (existingConstituencies.length <= 1) {
//     defaultConstituencies.map(async (defaultConstituency) => {
//       await Region.create({
//         name: defaultConstituency.name,
//         code: defaultConstituency.code,
//       });
//     });
//   }
// }
// saveDefaultConstituencies();

module.exports = {
  createConstituency,
  getAllConstituencies,
  updateConstituency,
  deleteConstituency,
  countConstituency,
  getConstituencyForRegions,
};

//http://localhost:3001/constituency
