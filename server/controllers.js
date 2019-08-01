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
  // FIXME: question_id and limit will be extracted from the req.body
  const queryEntry = `SELECT * FROM answers WHERE question_id = 1  ORDER BY date DESC LIMIT 2`;

  pool.query(queryEntry, (error, results) => {
    let answersArr = [];

    const resObj = {
      question: null || results.rows[0].question_id,
      page: 0, // change later
      count: 5, // some conditional like 5 || 'whatever is from the req.body
      results: answersArr
    };

    results.rows.forEach((answer) => {});

    if (error) {
      throw error;
    }

    // res.status(200).send(results.rows);
    res.status(200).json(resObj);
  });
};

const getQuestions = (res, req) => {
  // TODO: fix this query, currently not handling the answers and photos object

  // FIXME: this querry will need to be modified so that the sort can change based on the req.body
  const queryEntry = `SELECT * FROM questions AND product_id = 1 ORDER BY question_date DESC`;
  pool.query(queryEntry, (error, results) => {
    let questionsArr = [];

    results.rows.forEach((question) => {
      console.log(question);
      const questObj = {
        question_id: question.question_id,
        question_body: question.question_body,
        question_date: question.question_date,
        asker_name: question.asker_name,
        question_helpfulness: question.helpfulness,
        reported: question.reported,
        answers: {
          68: {
            id: '',
            body: '',
            date: '',
            answerer_name: '',
            helpfulness: '',
            photos: []
          }
        }
      };
      questionsArr.push(questObj);
    });
    const resObj = {
      product_id: results.rows[0]['product_id'],
      results: questionsArr
    };

    if (error) {
      throw error;
    }

    // console.log(resObj);
    // res.status(200).json(resObj);
    res.send(results.rows);
  });
};

const getAnswers = (res, req) => {
  // TODO: fix this query
  const queryEntry = `SELECT * FROM answers WHERE question_id = 1 ORDER BY question_date DESC`;
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    // res.status(200).send(results.rows);
  });
};

const postQuestion = (res, req) => {
  // TODO: fix this query
  const queryEntry = `SELECT * FROM answers WHERE question_id = 1 AND product_id = 1 ORDER BY question_date DESC`;
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const postAnswer = (req, res) => {
  // TODO: fix this query
  const queryEntry = `SELECT * FROM answers WHERE question_id = 1 AND product_id = 1 ORDER BY question_date DESC`;
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const helpfulQuestion = (req, res) => {
  // TODO: fix this query
  const queryEntry = `SELECT * FROM answers WHERE question_id = 1 AND product_id = 1 ORDER BY question_date DESC`;
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const reportQuestion = (req, res) => {
  // TODO: fix this query
  const queryEntry = `SELECT * FROM answers WHERE question_id = 1 AND product_id = 1 ORDER BY question_date DESC`;
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const helpfulAnswer = (req, res) => {
  // TODO: fix this query
  const queryEntry = `SELECT * FROM answers WHERE question_id = 1 AND product_id = 1 ORDER BY question_date DESC`;
  pool.query(queryEntry, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const reportAnswer = (req, res) => {
  // TODO: fix this query
  const queryEntry = `SELECT * FROM answers WHERE question_id = 1 AND product_id = 1 ORDER BY question_date DESC`;
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
