const pool = require('../db');

// Follow a user
const followUser = async (req, res) => {
  const { id } = req.params;
  const { followerId } = req.body;

  try {
    // Check if the user is already followed
    const existingFollow = await pool.query(
      'SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2',
      [followerId, id]
    );

    if (existingFollow.rows.length > 0) {
      return res.status(400).json({ message: 'Already following this user' });
    }

    const follow = await pool.query(
      'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) RETURNING *',
      [followerId, id]
    );
    res.json(follow.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a user's following list
const getFollowingList = async (req, res) => {
  const { id } = req.params;

  try {
    const following = await pool.query(
      `SELECT u.id, u.username, u.email 
       FROM follows f 
       JOIN users u ON f.following_id = u.id 
       WHERE f.follower_id = $1`,
      [id]
    );
    res.json(following.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  followUser,
  getFollowingList
};
