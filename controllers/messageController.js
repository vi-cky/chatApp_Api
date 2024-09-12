const pool = require('../db');

// Send a message
const sendMessage = async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  try {
    // Assume that messages are sent in chat rooms
    // You should determine which chat room the sender and recipient belong to
    // Here, we're assuming messages are sent directly between users, so no chat room involved

    // Create a default chat room for simplicity
    // You may want to have a more sophisticated chat room handling

    const newMessage = await pool.query(
      'INSERT INTO messages (chat_room_id, sender_id, content) VALUES (NULL, $1, $2) RETURNING *',
      [senderId, content]
    );
    res.json(newMessage.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  sendMessage
};
