const ClassSchool = require('../../../models/Academic/ClassSchool/ClassSchool.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Sections = require('../../../models/Academic/Section/ClassSection.mongo');

// Assign a class to a school
const createClassSchool = async (req, res) => {
  try {
    const { schoolId, classId } = req.body;
    const defaultSection = await Sections.create({ label: 'A' });
    const defaultSectionId = ObjectId(defaultSection._id);
    const classSchool = await ClassSchool.create({
      schoolId: schoolId,
      classId: classId,
      defaultSectionId: defaultSectionId,
    });
    const classSchoolId = ObjectId(classSchool._id);
    await Sections.findByIdAndUpdate(defaultSectionId, {
      classSchoolId: classSchoolId,
    });
    return res.json(classSchool);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// find all classes schools and sections
const findAllClassSchool = async (req, res) => {
  try {
    const classSchools = await ClassSchool.find({})
      .populate('schoolId', 'label')
      .populate('classId', 'label')
      .populate('defaultSectionId', 'label')
      .exec();
    return res.json(classSchools);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// find class school by id
// const findClassSchoolById = async (id) => {
//   id = ObjectId(id);
//   const res = await ClassSchool.findById(id);
//   return res;
// };

// delete class school
const deleteClassSchool = async (req, res) => {
  try {
    const { id } = req.params;
    await Sections.deleteMany({ classSchoolId: id });
    const deletedClassSchool = await ClassSchool.findByIdAndDelete(id);
    return res.json(deletedClassSchool);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
//update class school
const updateClassSchool = async (req, res) => {
  try {
    const { id } = req.params; // class school id
    const { schoolId, classId, defaultSectionId } = req.body;
    const updatedClassSchool = await ClassSchool.findByIdAndUpdate(id, {
      schoolId,
      classId,
      defaultSectionId,
    });
    return res.json(updatedClassSchool);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// find a class in class school
const findClass = async (req, res) => {
  try {
    const { id } = req.params; // class id
    const foundClass = await ClassSchool.find({ classId: ObjectId(id) })
      .populate('classId', 'label')
      .populate('schoolId', 'label')
      .populate('defaultSectionId', 'label');
    return res.json(foundClass);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// find all classes and sections for a given school
const findAssignedClassWithSchoolId = async (req, res) => {
  try {
    const { id } = req.params; // school id
    const assignedClass = await ClassSchool.find(
      { schoolId: id },
      { schools: 0 },
      { _id: 0 }
    ).populate('classId');
    return res.json(assignedClass);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get unique classes from class school without the school or section info
const getUniqueClass = async (req, res) => {
  try {
    const { id } = req.params; // school id
    const uniqueClass = await ClassSchool.find({})
      .select(['classId'])
      .populate('classId')
      .where('schoolId')
      .equals(id);
    return res.json(uniqueClass);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//  FOR EVERY CLASS THERE SHOULD BE A DIFFERENT CLASS SCHOOL

module.exports = {
  createClassSchool,
  findAllClassSchool,
  deleteClassSchool,
  findClass,
  getUniqueClass,
  updateClassSchool,
  findAssignedClassWithSchoolId,
};
