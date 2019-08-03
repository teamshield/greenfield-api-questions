const pgp = require('pg-promise');

const { PSQL_CONFIG } = require('../config.js');
const db = pgp(PSQL_CONFIG);

module.exports = db;
