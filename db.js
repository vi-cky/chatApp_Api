const { Pool } = require('pg');

const pool = new Pool({
  user: 'vijay',
  host: 'localhost',
  database: 'chat_db',
  password: 'reliable',
  port: 5432,
});

module.exports = pool;
