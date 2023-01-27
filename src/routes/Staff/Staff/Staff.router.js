const express = require('express');
const {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  activateAccount,
  resetPassword,
  forgotPassword,
  signInStaff,
} = require('../../../controllers/Staff/Staff/Staff.controller');
const router = express.Router();

router.post('/', createStaff);
router.get('/', getAllStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);
router.post('/login', signInStaff);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password/:token', resetPassword);
router.get('/:id/verify/:token', activateAccount);

module.exports = router;
