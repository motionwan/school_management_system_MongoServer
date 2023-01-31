const Classes = require('../../../models/SchoolManagment/Classes/classes.mongo');
const mongoose = require('mongoose');
//const Sections = require('../../../models/Academic/sections/section.mongo');
//const ClassSchool = require('../../../models/Academic/ClassSchool/classSchool.mongo');
const toId = mongoose.Types.ObjectId;

// get all classes from the database
const getAllClasses = async (req, res) => {
  try {
    const classes = await Classes.find({});
    return res.json(classes);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

//create a new class
const createNewClass = async (req, res) => {
  try {
    const { label } = req.body;
    return res.json(await Classes.create({ label }));
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(401)
        .json({ error: 'Class With this name Already Exists' });
    } else return res.status(500).json(err.message);
  }
};

const classExists = async ({ label }) => {
  const clsName = await Classes.findOne({ label: label });
  return clsName;
};

// update classes
const updateClass = async (req, res) => {
  try {
    const { label } = req.body;
    const { id } = req.params;
    return res.json(await Classes.findByIdAndUpdate(id, { label }));
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

//delete classes from database
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Classes.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
// find class by id
const findClassById = async (id) => {
  const cls = await Classes.findById(id).populate('sections');
  return cls;
};

const defaultClasses = [
  {
    label: 'First Grade',
    data: 'First Grade',
  },

  {
    label: 'Second Grade',
    data: 'Second Grade',
  },
  {
    label: 'Third Grade',
    data: 'Third Grade',
  },

  {
    label: 'Fourth Grade',
    data: 'Fourth Grade',
  },

  {
    label: 'Fifth Grade',
    data: 'Fifth Grade',
  },

  {
    label: 'Sixth Grade',
    data: 'Sixth Grade',
  },

  {
    label: 'Seventh Grade',
    data: 'Seventh Grade',
  },

  {
    label: 'Eighth Grade',
    data: 'Eighth Grade',
  },

  {
    label: 'Ninth Grade',
    data: 'Ninth Grade',
  },

  {
    label: 'Tenth Grade',
    data: 'Tenth Grade',
  },

  {
    label: 'Eleventh Grade',
    data: 'Eleventh Grade',
  },

  {
    label: 'Twelfth Grade',
    data: 'Twelfth Grade',
  },

  {
    label: 'Thirteenth Grade',
    data: 'Thirteenth Grade',
  },
];

// async function saveDefaultClasses() {
//   saveDefaultClasses = function () {};
//   const myClass = await Classes.find({});
//   if (myClass.length <= 1) {
//     defaultClasses.map(async (defaultClass) => {
//       await Classes.create({
//         label: defaultClass.label,
//       });
//     });
//   }
// }
//saveDefaultClasses();
module.exports = {
  deleteClass,
  updateClass,
  createNewClass,
  getAllClasses,
  classExists,
  findClassById,
};
