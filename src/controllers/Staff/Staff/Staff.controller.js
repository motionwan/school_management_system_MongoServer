const Staff = require('../../../models/Staff/Staff/Staff.mongo');
const Token = require('../../../models/Token/Token.mongo');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtRefreshToken = process.env.REFRESH_TOKEN;
const jwtAccessToken = process.env.ACCESS_TOKEN;
const sendEmail = require('../../../utils/email');

const createStaff = async (req, res) => {
  try {
    const {
      fullName,
      schoolId,
      role,
      status,
      phoneNumber,
      photoId,
      gender,
      dateOfBirth,
      username,
      email,
      address,
    } = req.body;
    const image = req?.file?.path;
    const password = await bcrypt.hash(req.body.password, 12);

    const newStaff = await Staff.create({
      fullName,
      schoolId,
      role,
      photoId,
      gender,
      dateOfBirth,
      status,
      image,
      phoneNumber,
      username,
      email,
      password,
      address,
    });
    if (newStaff) {
      const token = await Token.create({
        userId: newStaff._id,
        token: crypto.randomBytes(32).toString('hex'),
      });
      const url = `${process.env.CLIENT_URL}/users/${newStaff._id}/verify/${token.token}`;
      await sendEmail(newStaff.email, 'Verify Email', url);
      //console.log(token);
      return res
        .status(201)
        .json({ message: 'Email sent to account please verify' });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Staff Already Exists' });
    }
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// activate account
const activateAccount = async (req, res) => {
  const { id, token } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(400).json({ error: 'Invalid Link' });
    }
    const oldToken = await Token.findOne({
      userId: id,
      token: token,
    });
    if (!oldToken) {
      return res.status(400).json({ error: 'Link has expired' });
    }
    await Staff.updateOne({ _id: staff._id, verified: true });
    await Token.deleteOne();
    return res.json({ message: 'email verified Successfully' });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const signInStaff = async (req, res) => {
  try {
    const login = req.body.login.toLowerCase();
    const password = req.body.password;
    // const currentElectionYearId = await Settings.find({});
    const staff = await Staff.findOne({
      $or: [{ username: login }, { email: login }],
    });
    if (!staff) {
      return res.json({ message: 'Invalid username, email or password' });
    }
    if (staff && !staff.verified) {
      const token = await Token.updateOne(
        { _id: staff._id },
        {
          userId: staff._id,
          token: crypto.randomBytes(32).toString('hex'),
        },
        { upsert: true }
      );
      const url = `${process.env.CLIENT_URL}/users/${staff._id}/verify/${token.token}`;

      await sendEmail(staff.email, 'Verify Email', url);
      return res.json({
        message: 'Account not verified. Check email and verify account',
      });
    } else if (!(await bcrypt.compare(password, staff.password))) {
      return res.json({ message: 'Invalid username, email or password' });
    } else {
      const accessToken = jwt.sign(
        {
          username: staff.username,
        },
        jwtAccessToken,
        { expiresIn: '10m' }
      );
      const refreshToken = jwt.sign(
        { username: staff.username },
        jwtRefreshToken,
        { expiresIn: '1d' }
      );

      staff.refreshToken = refreshToken;
      await staff.save();
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
        username: staff.username,
        image: staff?.image,
        email: staff.email,
        role: staff?.role,
        pollingStationId: staff?.pollingStationId,
        constituencyId: staff?.constituencyId,
        regionId: staff?.regionId,
        userId: staff?._id,
        // we want the current election year id
        // electionYearId: currentElectionYearId[0]?.currentElectionYear,
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
      const staff = await Staff.findOne({ email });
      if (staff) {
        const token = await Token.create({
          userId: staff._id,
          token: crypto.randomBytes(32).toString('hex'),
        });
        const url = `${process.env.CLIENT_URL}/users/${staff._id}/verify/${token.token}`;

        await sendEmail(email, 'Reset Email with the following link', url);
        await Staff.updateOne({ resetPasswordToken: token.token });
        return res
          .status(201)
          .json({ message: 'Password reset link has been sent to email' });
        //res.json({ token: token.token });
      }
      return res
        .status(404)
        .json({ error: 'Staff not found make sure your email is correct' });
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
    const staff = await Staff.findOne({ resetPasswordToken: token });
    if (staff) {
      await staff.updateOne({
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

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req?.file?.path;
    const {
      fullName,
      schoolId,
      role,
      dateOfBirth,
      status,
      gender,
      photoId,
      phoneNumber,
      username,
      email,
      address,
    } = req.body;
    return res.status(200).json(
      await Staff.findByIdAndUpdate(id, {
        fullName,
        schoolId,
        role,
        dateOfBirth,
        status,
        gender,
        image,
        photoId,
        phoneNumber,
        username,
        email,
        address,
      })
    );
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Staff Already Exists' });
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
    return res.json(await Staff.find({}).populate('role'));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Staff.findByIdAndDelete(id));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createStaff,
  updateStaff,
  deleteStaff,
  getAllStaff,
  activateAccount,
  resetPassword,
  forgotPassword,
  signInStaff,
};
