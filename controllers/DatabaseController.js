const { Client } = require('pg')

module.exports.db = async(req, res, next) => {
  const client = new Client({
    host: 'localhost',
    database: 'test_db',
    port: 5432,
    user: 'test',
    password: 'test'
  });
  try{
    await client.connect();
    const query = await client.query('SELECT NOW()');
    req.dbquery = query.rows[0];
    await client.end();
    next();
  }catch(err){
    next(err);
  }
}

