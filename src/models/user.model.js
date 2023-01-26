const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    max: 50,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    max: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: { type: String },
  phone: { type: String },
  address: { String },
  gender: { type: String },
  role: {
    type: String,
    default: 'pollingAgent',
  },
  refreshToken: {
    type: String,
  },
  resetPasswordToken: {
    data: String,
    default: '',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  pollingStationId: { type: toId, ref: 'pollingStation' },
  constituencyId: { type: toId, ref: 'constituency' },
  regionId: { type: toId, ref: 'region' },
  electionYearId: { type: toId, ref: 'season', required: true },
});

module.exports = mongoose.model('user', userSchema);
