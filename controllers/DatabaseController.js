const { Client } = require('pg')

module.exports.db = async (req, res, next) => {
  const client = new Client({
    host: 'localhost',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  await client.connect();
  const query = await client.query('SELECT NOW()');
  req.dbquery = query.rows[0];
  await client.end();
  next();
}

