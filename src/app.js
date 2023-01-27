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

//call routes
app.use('/schools', SchoolsRouter);
app.use('/classes', ClassRouter);
app.use('/class_school', ClassSchoolRouter);
app.use('/term', TermRouter);

module.exports = app;
