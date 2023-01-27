const Staff = require('../../../models/Staff/Staff/Staff.mongo');

const createStaff = async (req, res) => {
  try {
    const {
      fullName,
      schoolId,
      role,
      status,
      phoneNumber,
      photoId,
      gender,
      dateOfBirth,
      username,
      email,
      address,
    } = req.body;
    return res.status(201).json(
      await Staff.create({
        fullName,
        schoolId,
        role,
        photoId,
        gender,
        dateOfBirth,
        status,
        phoneNumber,
        username,
        email,
        address,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      schoolId,
      role,
      dateOfBirth,
      status,
      gender,
      photoId,
      phoneNumber,
      username,
      email,
      address,
    } = req.body;
    return res.status(200).json(
      await Staff.findByIdAndUpdate(id, {
        fullName,
        schoolId,
        role,
        dateOfBirth,
        status,
        gender,
        photoId,
        phoneNumber,
        username,
        email,
        address,
      })
    );
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Staff Already Exists' });
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
    return res.json(await Staff.find({}).populate('role'));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Staff.findByIdAndDelete(id));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createStaff,
  updateStaff,
  deleteStaff,
  getAllStaff,
};
