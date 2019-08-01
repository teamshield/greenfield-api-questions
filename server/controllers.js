const Pool = require('pg').Pool;
const psql_pwd = require('../config.js');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'postgres',
  password: psql_pwd,
  port: 5432
});

// const queries = require('./queries');

const dummyController = (req, res) => {
  // res.json({ info: 'Node.js, Express, and Postgres API' });
  // res.send(`fixed start script`);
  pool.query(
    'SELECT * FROM questions WHERE question_id = 2',
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(results.rows);
    }
  );
};

const getQuestions = (res, req) => {
  res.send(`get questiosn working`);
};

const getAnswers = (res, req) => {
  //
};

const postQuestion = (res, req) => {
  //
};

const postAnswer = (req, res) => {
  //
};

const helpfulQuestion = (req, res) => {
  //
};

const reportQuestion = (req, res) => {
  //
};

const helpfulAnswer = (req, res) => {
  //
};

const reportAnswer = (req, res) => {
  //
};

module.exports = {
  dummyController,
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  helpfulQuestion,
  reportQuestion,
  helpfulAnswer,
  reportAnswer
};
