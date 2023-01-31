const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const { format } = require('date-fns');

const classesSchema = new Schema({
  label: {
    type: String,
    require: true,
    default: null,
    unique: true,
  },
  createdAt: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});

// if a class is deleted, delete all sections associated with the class

module.exports = mongoose.model('Classes', classesSchema);
