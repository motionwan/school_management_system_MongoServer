require('dotenv').config();
const User = require('../models/user.model');
const Token = require('../models/token.model');
const Settings = require('../models/settings.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtRefreshToken = process.env.REFRESH_TOKEN;
const jwtAccessToken = process.env.ACCESS_TOKEN;
//const jwtResetToken = process.env.JWT_RESET_PASSWORD;
const sendEmail = require('../utils/email');
const crypto = require('crypto');

// sign up user
const signUpUser = async (req, res) => {
  const {
    name,
    username,
    email,
    phone,
    address,
    gender,
    role,
    pollingStationId,
    constituencyId,
    regionId,
    electionYearId,
  } = req.body;
  const image = req?.file?.path;
  const password = await bcrypt.hash(req.body.password, 12);
  try {
    await User.create(
      {
        name,
        username,
        email,
        password,
        image,
        phone,
        address,
        gender,
        role,
        pollingStationId,
        constituencyId,
        regionId,
        electionYearId,
      },
      async (err, user) => {
        if (user) {
          const token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
          });
          const url = `${process.env.CLIENT_URL}/users/${user._id}/verify/${token.token}`;

          await sendEmail(user.email, 'Verify Email', url);
          console.log(token);
          return res
            .status(201)
            .json({ message: 'Email sent to account please verify' });
        }
        if (err) {
          console.log(err);
          if (err.code === 11000) {
            return res.status(409).json({ error: 'User already exists' });
          } else if ((err.name = 'ValidationError')) {
            return res.json({
              error: 'One or more fields are required please fill form again',
            });
          }
        } else {
          return res.status(401).json({ error: err });
        }
      }
    );
    // create token
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: err });
  }
};

// activate account
const activateAccount = async (req, res) => {
  const { id, token } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ error: 'Invalid Link' });
    }
    const oldToken = await Token.findOne({
      userId: id,
      token: token,
    });
    if (!oldToken) {
      return res.status(400).json({ error: 'Link has expired' });
    }
    await User.updateOne({ _id: user._id, verified: true });
    await Token.deleteOne();
    return res.json({ message: 'email verified Successfully' });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const signInUser = async (req, res) => {
  try {
    const login = req.body.login.toLowerCase();
    const password = req.body.password;
    const currentElectionYearId = await Settings.find({});
    const user = await User.findOne({
      $or: [{ username: login }, { email: login }],
    });
    if (!user) {
      return res.json({ message: 'Invalid username, email or password' });
    }
    if (user && !user.verified) {
      const token = await Token.updateOne(
        { _id: user._id },
        {
          userId: user._id,
          token: crypto.randomBytes(32).toString('hex'),
        },
        { upsert: true }
      );
      const url = `${process.env.CLIENT_URL}/users/${user._id}/verify/${token.token}`;

      await sendEmail(user.email, 'Verify Email', url);
      return res.json({
        message: 'Account not verified. Check email and verify account',
      });
    } else if (!(await bcrypt.compare(password, user.password))) {
      return res.json({ message: 'Invalid username, email or password' });
    } else {
      const accessToken = jwt.sign(
        {
          username: user.username,
        },
        jwtAccessToken,
        { expiresIn: '10m' }
      );
      const refreshToken = jwt.sign(
        { username: user.username },
        jwtRefreshToken,
        { expiresIn: '1d' }
      );

      user.refreshToken = refreshToken;
      await user.save();
      // send data via cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // send data via json
      return res.json({
        accessToken: accessToken,
        username: user.username,
        image: user?.image,
        email: user.email,
        role: user?.role,
        pollingStationId: user?.pollingStationId,
        constituencyId: user?.constituencyId,
        regionId: user?.regionId,
        userId: user?._id,
        // we want the current election year id
        electionYearId: currentElectionYearId[0]?.currentElectionYear,
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.json({
        message:
          'Account not verified please check your email to verify account',
      });
    }
    console.log(err);
    return res.json({ error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await User.findOne({ email });
      const token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      });
      const url = `${process.env.CLIENT_URL}/users/${user._id}/verify/${token.token}`;

      await sendEmail(email, 'Reset Email with the following link', url);
      await user.updateOne({ resetPasswordToken: token.token });
      return res
        .status(201)
        .json({ message: 'Password reset link has been sent to email' });
      //res.json({ token: token.token });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const user = await User.findOne({ resetPasswordToken: token });
    if (user) {
      await user.updateOne({
        password: await bcrypt.hash(password, 12),
        resetPasswordToken: null,
      });
      await Token.deleteOne({ token: token });
      res.json({ message: 'Password reset successful' });
    } else {
      console.log('user not found');
      res.status(400).json({
        error: 'Password reset link expired. Please reset password again',
      });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const countUsers = async (req, res) => {
  try {
    const userCount = await User.count();
    return res.json(userCount);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get users by year
const getAllUsersByElectionYearId = async (req, res) => {
  try {
    const { electionYearId } = req.body;
    const users = await User.find({
      electionYearId,
      verified: true,
    });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = ({
      name,
      username,
      email,
      address,
      gender,
      phone,
      password,
      role,
      regionId,
      constituencyId,
      pollingStationId,
    } = req.body);
    const updatedUser = await User.findByIdAndUpdate(userId, userData);
    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getRegionalAgents = async (req, res) => {
  try {
    const regionId = req.params.id;
    const { electionYearId } = req.body;
    const regionalAgents = await User.find({ regionId, electionYearId });
    return res.json(regionalAgents);
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return res.json(deletedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getConstituencyAgents = async (req, res) => {
  try {
    const constituencyId = req.params.id;
    const { electionYearId } = req.body;
    const constituencyAgent = await User.find({
      constituencyId,
      electionYearId,
    });
    return res.json(constituencyAgent);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signUpUser,
  activateAccount,
  signInUser,
  forgotPassword,
  resetPassword,
  countUsers,
  getAllUsersByElectionYearId,
  updateUser,
  getRegionalAgents,
  deleteUser,
  getConstituencyAgents,
};
