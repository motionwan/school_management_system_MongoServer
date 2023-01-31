const Attendance = require('../../../models/Academic/StudentAttendance/StudentAttendance.mongo');

// create attendance
const takeAttendance = async (req, res) => {
  try {
    const { attendanceDate, status, studentRecordId } = req.body;
    return res.json(
      await Attendance.create({ attendanceDate, status, studentRecordId })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// get all attendance
const getallAttendance = async (req, res) => {
  try {
    return res.json(await Attendance.find({}));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

//update attendance
const updateAttendance = async (req, res) => {
  try {
    const id = req.params.id; // attendance id
    const { attendanceDate, status, studentRecordId } = req.body;
    return res.json(
      await Attendance.findByIdAndUpdate(id, {
        attendanceDate,
        status,
        studentRecordId,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status.json({ error: err.message });
  }
};

// delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const id = req.params.id; // attendance id
    return res.json(await Attendance.findByIdAndDelete(id));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  deleteAttendance,
  getallAttendance,
  takeAttendance,
  updateAttendance,
};
