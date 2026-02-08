const express = require('express');
const {
  getUsers,
  getDashboardStats,
  updateUserRole,
  deleteUser
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/users', getUsers);
router.get('/stats', getDashboardStats);
router.put('/users/:id', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
