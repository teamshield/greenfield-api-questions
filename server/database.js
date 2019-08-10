const pgp = require('pg-promise')();
const { PSQL_CONFIG } = require('../config.js');

// Testing to see which config is passed
console.log('PSQL_CONFIG', PSQL_CONFIG);

const db = pgp(PSQL_CONFIG);

module.exports = db;
