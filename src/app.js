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
  await mongoose.connect(`${process.env.MONGO}`);
  console.log('Connection to server established');
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
app.use(cors(corsOption));

// import routes
const userRouter = require('./routes/user.router');
const pollingStationRouter = require('./routes/pollingStation.router');
const constituencyRouter = require('./routes/constituency.router');
const regionRouter = require('./routes/region.router');
const seasonRouter = require('./routes/season.router');
const settingsRouter = require('./routes/settings.router');
const partyRouter = require('./routes/party.router');
const voteRouter = require('./routes/vote.router');
const refreshTokenRouter = require('./routes/refreshToken.router');

//call routes
app.use('/users', userRouter);
app.use('/polling_station', pollingStationRouter);
app.use('/constituency', constituencyRouter);
app.use('/region', regionRouter);
app.use('/season', seasonRouter);
app.use('/settings', settingsRouter);
app.use('/party', partyRouter);
app.use('/vote', voteRouter);
app.use('/refresh_token', refreshTokenRouter);

module.exports = app;
