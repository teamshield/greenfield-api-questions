// TODO: In a production environment, you would want to put your configuration details in a separate file with restrictive permissions that is not accessible from version control, but for the simplicity of this tutorial , we’re keeping it in the same file as the queries.

const Pool = require('pg').Pool;
const psql_pwd = require('../config.js');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'postgres',
  password: psql_pwd,
  port: 5432
});

// get all
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//
