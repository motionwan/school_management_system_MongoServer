const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads.multer');
const {
  signUpUser,
  signInUser,
  activateAccount,
  forgotPassword,
  resetPassword,
  countUsers,
  getAllUsersByElectionYearId,
  updateUser,
  getRegionalAgents,
  deleteUser,
  getConstituencyAgents,
} = require('../controllers/user.controller');
const handleRefreshToken = require('../controllers/refreshToken.controller');

router.post('/signup', upload.single('image'), signUpUser);
router.post('/login', signInUser);
router.get('/refresh', handleRefreshToken);
router.get('/count', countUsers);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password/:token', resetPassword);
router.post('/constituency_agents/:id', getConstituencyAgents);
router.post('/users_by_year', getAllUsersByElectionYearId);
router.get('/:id/verify/:token', activateAccount);
router.put('/:id', updateUser);
router.post('/regional_agents/:id', getRegionalAgents);
router.delete('/:id', deleteUser);

module.exports = router;
