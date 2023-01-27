require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
mongoose.set('strictQuery', false);
const imageFolder = './images';

const app = express();

// connect to mongodb
const Connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO}`);
    console.log('Connection to server established');
  } catch (err) {
    return err.message;
  }
};

Connect();

const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(imageFolder));
app.use(cookieParser());
app.use(express.static('public/uploads'));
app.use(cors(corsOption));

// import routes
const SchoolsRouter = require('./routes/SchoolManagement/Schools/Schools.router');
const ClassRouter = require('./routes/SchoolManagement/Classes/classes.router');
const ClassSchoolRouter = require('./routes/Academics/ClassSchool/ClassSchool.router');
const TermRouter = require('./routes/SchoolManagement/Terms/Terms.router');
const HomeworkRouter = require('./routes/Academics/Homework/Homework.router');
const HomeworkSectionRouter = require('./routes/Academics/HomeworkSection/HomeworkSection.router');
const StudyMaterialRouter = require('./routes/Academics/StudyMaterials/StudyMaterials.router');
const ClassSchoolStudyMaterialRouter = require('./routes/Academics/ClassSchoolStudyMaterials/ClassSchoolStudyMaterial.router');
const StudentAttendanceRouter = require('./routes/Academics/StudentAttendance/StudentAttendance.router');
const SubjectRouter = require('./routes/Academics/Subjects/Subjects.router');
const StudentRecordRouter = require('./routes/Student/StudentRecord/StudentRecord.router');
const StaffRouter = require('./routes/Staff/Staff/Staff.router');
const RoleRouter = require('./routes/Staff/Roles/Roles.router');

//call routes
app.use('/schools', SchoolsRouter);
app.use('/classes', ClassRouter);
app.use('/class_school', ClassSchoolRouter);
app.use('/term', TermRouter);
app.use('/homework', HomeworkRouter);
app.use('/homework_section', HomeworkSectionRouter);
app.use('/study_materials', StudyMaterialRouter);
app.use('/class_school_study_materials', ClassSchoolStudyMaterialRouter);
app.use('/student_attendance', StudentAttendanceRouter);
app.use('/subject', SubjectRouter);
app.use('/student_record', StudentRecordRouter);
app.use('/staff', StaffRouter);
app.use('/role', RoleRouter);

module.exports = app;
