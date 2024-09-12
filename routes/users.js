const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.rows[0].id }, 'secret_key');
    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Follow a user
router.post('/:id/follow', async (req, res) => {
  const { id } = req.params;
  const followerId = req.body.followerId;

  try {
    const follow = await pool.query(
      'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) RETURNING *',
      [followerId, id]
    );
    res.json(follow.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
