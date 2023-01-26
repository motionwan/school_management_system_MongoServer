const Season = require('../models/season.model');

const createSeason = async (req, res) => {
  try {
    const { label, startDate, endDate } = req.body;
    const season = await Season.updateOne(
      { label },
      { label, startDate, endDate },
      { upsert: true }
    );
    return res.json(season);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

const getAllSeasons = async (req, res) => {
  try {
    const seasons = await Season.find({});
    return res.json(seasons);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createSeason, getAllSeasons };
