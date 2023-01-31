const { format } = require('date-fns');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const attendanceSchema = new Schema({
  attendanceDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: null,
  },
  studentRecordId: { type: toId, ref: 'StudentRecord' },
  createdAt: {
    type: String,
    default: format(new Date(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('StudentAttendance', attendanceSchema);
