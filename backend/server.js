const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  host: 'database',    // Service name of your Postgres container in compose
  port: 5432,
  database: 'appdb',
  user: 'postgres',
  password: 'password'
});

// Users endpoint
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log('Backend running on port', port);
});
