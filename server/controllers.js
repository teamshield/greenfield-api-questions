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
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const getQuestions = (res, req) => {
  // TODO: fix this query
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const getAnswers = (res, req) => {
  // TODO: fix this query
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const postQuestion = (res, req) => {
  // TODO: fix this query
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const postAnswer = (req, res) => {
  // TODO: fix this query
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const helpfulQuestion = (req, res) => {
  // TODO: fix this query
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const reportQuestion = (req, res) => {
  // TODO: fix this query
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const helpfulAnswer = (req, res) => {
  // TODO: fix this query
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const reportAnswer = (req, res) => {
  // TODO: fix this query
  const queryEntry =
    'SELECT * FROM questions WHERE question_id < 10 AND product_id = 1 ORDER BY question_date DESC ';
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
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
