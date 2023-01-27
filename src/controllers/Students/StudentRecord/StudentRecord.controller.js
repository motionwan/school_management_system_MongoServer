const StudentRecord = require('../../../models/Student/StudentRecord/StudentRecord.mongo');

const admitStudent = async (req, res) => {
  try {
    const {
      admissionNumber,
      rollNumber,
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      admissionDate,
      bloodGroup,
      fatherName,
      motherName,
      fatherPhoneNumber,
      motherPhoneNumber,
      status,
      fatherOccupation,
      motherOccupation,
      photoId,
      sectionId,
      sessionId,
      userId,
    } = req.body;
    return res.json(
      await StudentRecord.create({
        admissionNumber,
        rollNumber,
        fullName,
        gender,
        dateOfBirth,
        phoneNumber,
        email,
        address,
        admissionDate,
        bloodGroup,
        fatherName,
        motherName,
        fatherPhoneNumber,
        motherPhoneNumber,
        status,
        fatherOccupation,
        motherOccupation,
        photoId,
        sectionId,
        sessionId,
        userId,
      })
    );
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Student Already admitted' });
    } else {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  }
};

const deActivateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deActivatedStudent = await StudentRecord.findByIdAndUpdate(id, {
      status: false,
    });
    return res.json(deActivatedStudent);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getAllStudents = async (req, res) => {
  try {
    return res.json(await StudentRecord.find({}));
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params; // student id
    const {
      admissionNumber,
      rollNumber,
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      admissionDate,
      bloodGroup,
      fatherName,
      motherName,
      fatherPhoneNumber,
      motherPhoneNumber,
      status,
      fatherOccupation,
      motherOccupation,
      photoId,
      sectionId,
      sessionId,
      userId,
    } = req.body;
    return res.json(
      await StudentRecord.findByIdAndUpdate(id, {
        admissionNumber,
        rollNumber,
        fullName,
        gender,
        dateOfBirth,
        phoneNumber,
        email,
        address,
        admissionDate,
        bloodGroup,
        fatherName,
        motherName,
        fatherPhoneNumber,
        motherPhoneNumber,
        status,
        fatherOccupation,
        motherOccupation,
        photoId,
        sectionId,
        sessionId,
        userId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const bulkAdmitStudents = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await StudentRecord.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// try {
// } catch (err) {
//   return res.status(500).json({ error: err });
// }

module.exports = {
  admitStudent,
  deActivateStudent,
  updateStudent,
  getAllStudents,
  deleteStudent,
};
