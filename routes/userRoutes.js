const express = require('express');
const router = express.Router();
const { followUser, getFollowingList } = require('../controllers/userController');

// Follow a user
router.post('/:id/follow', followUser);

// Get a user's following list
router.get('/:id/following', getFollowingList);

module.exports = router;
