const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/messageController');

// Send a message
router.post('/send', sendMessage);

module.exports = router;
