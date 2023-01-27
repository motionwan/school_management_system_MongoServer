const Session = require('../../../models/SchoolManagment/Terms/terms.mongo');

// create session
const createSession = async (req, res) => {
  try {
    const { label, startDate, endDate } = req.body;
    return res.json(await Session.create({ label, startDate, endDate }));
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(500)
        .json({ error: 'A Term with label already exists' });
    return res.status(500).json({ error: err.message });
  }
};
//read session
const getAllSessions = async (req, res) => {
  try {
    return res.json(await Session.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
//update session
const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, startDate, endDate } = req.body;
    return res.json(
      await Session.findByIdAndUpdate(id, { label, startDate, endDate })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// delete session
const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Session.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// find if session exists

module.exports = {
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
};
