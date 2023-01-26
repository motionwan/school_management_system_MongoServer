const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const tokenSchema = new Schema({
  userId: {
    type: toId,
    required: true,
    ref: 'user',
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model('token', tokenSchema);
