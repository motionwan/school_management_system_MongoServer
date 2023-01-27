const { format } = require('date-fns');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const studentSchema = new Schema({
  admissionNumber: {
    type: String,
    unique: true,
    required: true,
  },
  rollNumber: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  admissionDate: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  fatherPhoneNumber: {
    type: String,
  },
  motherPhoneNumber: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  fatherOccupation: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
  photoId: {
    // deal with this when photo database is ready
    type: String,
  },
  sectionId: { type: toId, ref: 'Section' },
  sessionId: { type: toId, ref: 'Session' },

  userId: {
    type: String,
  },
  createdAt: {
    type: String,

    default: format(new Date(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('StudentRecord', studentSchema);
