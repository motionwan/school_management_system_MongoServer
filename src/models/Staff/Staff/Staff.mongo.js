const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;
const StaffSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  photoId: {
    type: String,
  },
  gender: {
    type: String,
  },
  schoolId: {
    type: toId,
    ref: 'School',
    required: true,
  },

  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
  },

  role: {
    type: toId,
    ref: 'Roles',
    required: true,
  },
  status: { type: Boolean, required: true },
});

module.exports = mongoose.model('Staff', StaffSchema);
