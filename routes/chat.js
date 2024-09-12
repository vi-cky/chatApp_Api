const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new chat room
router.post('/rooms', async (req, res) => {
  const { name, createdBy } = req.body;

  try {
    const newRoom = await pool.query(
      'INSERT INTO chat_rooms (name, created_by) VALUES ($1, $2) RETURNING *',
      [name, createdBy]
    );
    res.json(newRoom.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Join a chat room
router.post('/rooms/:roomId/join', async (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.body;

  try {
    const userChatRoom = await pool.query(
      'INSERT INTO user_chat_rooms (user_id, chat_room_id) VALUES ($1, $2) RETURNING *',
      [userId, roomId]
    );
    res.json(userChatRoom.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Send a message
router.post('/rooms/:roomId/messages', async (req, res) => {
  const { roomId } = req.params;
  const { senderId, content } = req.body;

  try {
    const newMessage = await pool.query(
      'INSERT INTO messages (chat_room_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *',
      [roomId, senderId, content]
    );
    res.json(newMessage.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Fetch messages from a room
router.get('/rooms/:roomId/messages', async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await pool.query('SELECT * FROM messages WHERE chat_room_id = $1', [roomId]);
    res.json(messages.rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
