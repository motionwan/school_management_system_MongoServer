const express = require('express');
const router = express.Router();

const {
  createRoles,
  updateRoles,
  deleteRoles,
  getAllRoles,
} = require('../../../controllers/Staff/Roles/Roles.controller');

router.post('/', createRoles);
router.get('/', getAllRoles);
router.put('/:id', updateRoles);
router.delete('/:id', deleteRoles);

module.exports = router;
