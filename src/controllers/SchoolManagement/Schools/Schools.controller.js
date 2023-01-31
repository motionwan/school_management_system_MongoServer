const Schools = require('../../../models/SchoolManagment/Schools/schools.mongo');

const getAllSchool = async (req, res) => {
  try {
    res.json(await Schools.find({}));
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const createNewSchool = async (req, res) => {
  try {
    const {
      label,
      phone,
      address,
      email,
      enrollmentPrefix,
      status,
      admins,
      lastEnrollmentCount,
      lastInvoiceCount,
    } = req.body;
    const createdSchool = await Schools.create({
      label,
      phone,
      address,
      email,
      enrollmentPrefix,
      status,
      admins,
      lastEnrollmentCount,
      lastInvoiceCount,
    });
    return res.json(createdSchool);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(401).json({ error: 'School Already Exist' });
    } else return res.status(500).json(err);
  }
};

const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Schools.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json(err.message);
  }
  //}
};

const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, phone, address, email, status } = req.body;
    return res.json(
      await Schools.findByIdAndUpdate(id, {
        label,
        phone,
        address,
        email,
        status,
      })
    );
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = {
  getAllSchool,
  createNewSchool,
  deleteSchool,
  updateSchool,
  //   schoolExists,
  //   findSchoolById,
  //   defaultSchool,
};
