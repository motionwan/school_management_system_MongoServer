const { Schema } = require('mongoose');

const settingsSchema = new Schema({
  school: {
    type: mongoose.Types.ObjectId,
    ref: 'School',
    required: true,
    default: null,
  },
  settingsKey: {
    type: String,
    default: null,
  },
  settingsValue: {
    type: String,
    default: null,
  },
});
module.exports = mongoose.model('Setting', settingsSchema);
