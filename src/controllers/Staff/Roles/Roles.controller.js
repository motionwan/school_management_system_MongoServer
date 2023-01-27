const Roles = require('../../../models/Staff/Roles/Roles.mongo');

const createRoles = async (req, res) => {
  try {
    const { name, schoolId, permissions } = req.body;
    return res.json(await Roles.create({ name, schoolId, permissions }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const updateRoles = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, schoolId, permissions } = req.body;
    return res.json(
      await Roles.findByIdAndUpdate(id, { name, schoolId, permissions })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteRoles = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Roles.findByIdAndDelete(id));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    return res.json(await Roles.find({}));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports = {
  createRoles,
  updateRoles,
  deleteRoles,
  getAllRoles,
};
