const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;

const Permissions = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  permissions: [Permissions],
});

module.exports = mongoose.model('Roles', roleSchema);
