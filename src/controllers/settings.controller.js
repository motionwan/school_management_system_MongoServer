const Settings = require('../models/settings.model');

const createSettings = async (req, res) => {
  try {
    const { currentElectionYear, up } = req.body;

    const setting = await Settings.updateOne(
      { up: up },
      { currentElectionYear },
      { upsert: true }
    );
    return res.json(setting);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

const getAllSetting = async (req, res) => {
  try {
    const allSettings = await Settings.find({});
    return res.json(allSettings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createSettings, getAllSetting };
