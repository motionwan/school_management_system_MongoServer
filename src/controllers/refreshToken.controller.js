require('dotenv').config();
const User = require('../models/user.model');
const Settings = require('../models/settings.model');
const jwt = require('jsonwebtoken');
const jwtRefreshToken = process.env.REFRESH_TOKEN;
const jwtAccessToken = process.env.ACCESS_TOKEN;

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ error: 'You are not authorized' });
  const refreshToken = cookies.jwt;
  // find the current election year id
  const currentElectionYearId = await Settings.find({});

  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) return res.status(403).json({ error: 'User not found try again' });
  // evaluate jwt
  jwt.verify(refreshToken, jwtRefreshToken, (e, decoded) => {
    if (e || user.username !== decoded.username)
      return res.status(403).json({ error: 'Forbidden' });
    const accessToken = jwt.sign(
      {
        username: decoded.username,
      },
      jwtAccessToken,
      { expiresIn: '10m' }
    );
    // send token to the front end
    // for constituency managers
    if (user.role === 'constituency') {
      return res.json({
        accessToken: accessToken,
        roles: [user.role],
        username: user.username,
        name: user.name,
        image: user.image,
        constituencyId: user.constituencyId,
        regionId: user.regionId,
        userId: user._id,
        currentElectionYearId: currentElectionYearId[0].currentElectionYear,
      });
    }
    if (user.role === 'region') {
      return res.json({
        accessToken: accessToken,
        roles: [user.role],
        name: user.name,
        username: user.username,
        image: user.image,
        regionId: user.regionId,
        userId: user._id,
        currentElectionYearId: currentElectionYearId[0].currentElectionYear,
      });
    }
    if (user.role === 'admin') {
      return res.json({
        accessToken: accessToken,
        roles: [user.role],
        name: user.name,
        username: user.username,
        image: user.image,
        userId: user._id,
        currentElectionYearId: currentElectionYearId[0]?.currentElectionYear,
      });
    }
  });
};

module.exports = handleRefreshToken;
