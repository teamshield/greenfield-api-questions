module.exports = {
  PSQL_CONFIG: {
    user: process.env.PGUSER || 'me',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'api',
    password: process.env.PGPASSWORD || 'hi',
    port: process.env.PGPORT || 5432
  }
};
