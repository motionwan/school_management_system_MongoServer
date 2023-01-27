const Section = require('./section.mongo');
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

// read all sections
const findAllSections = async () => {
  const res = await Section.find({});
  return res;
};

// update a section
const updateSection = async (id, section) => {
  id = toId(id);
  const res = await Section.findByIdAndUpdate(id, section);
  return res;
};

// delete a section
const deleteSection = async (id) => {
  id = toId(id);
  const res = await Section.findByIdAndDelete(id);
  return res;
};

// find sections with classSchool id
const findSectionWithClassSchoolId = async (id) => {
  const res = await Section.find({}).where('classSchoolId').equals(id);
  return res;
};
// create a section and assign a class section id
const createSectionAndAssignClassSectionId = async (label, id) => {
  id = toId(id);
  const classSchool = await Section.create({
    label: label,
    classSchoolId: id,
  });
  return classSchool;
};
module.exports = {
  findAllSections,
  deleteSection,
  updateSection,
  findSectionWithClassSchoolId,
  createSectionAndAssignClassSectionId,
};
