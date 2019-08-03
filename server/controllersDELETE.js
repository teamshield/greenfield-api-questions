const Pool = require('pg').Pool;
const psql_pwd = require('../config.js');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: psql_pwd,
  port: 5432
});

// const queries = require('./queries');

// test req.body for post:
// {
// 	"body": "testbody",
// 	"name": "testname",
// 	"email": "testemail"
// }

const dummyController = (req, res) => {
  // const { body, name, email } = req.body;
  // let valArr = [body, name, email];
  // console.log('req.body => ', valArr);

  // const { id } = req.params.question_id;
  // console.log('id', id);

  // TODO: change limit r something to that effect
  const queryEntry = `SELECT * FROM questions WHERE product_id = 1 AND reported = 0 ORDER BY question_date DESC LIMIT 5`;

  pool.query(queryEntry, (error, results) => {
    if (error) {
      console.log('error', error);
    }
    res.json(results.rows);
  });

  // TEST GETALL:
  // const query = `SELECT * FROM questions WHERE question_body = 'testbody`;

  // pool.query(queryEntry, (error, results) => {
  //   if (err) {
  //     console.log('err', err);
  //   }
  //   res.status(200).json(results.rows);
  // });
};

const getQuestions = (req, res) => {
  // TODO: fix this query, currently not handling the answers and photos object
  // FIXME: this querry will need to be modified so that the sort can change based on the req.body
  // Add a condition where helpfulness != 0
  const queryEntry = `SELECT * FROM questions ARRAY_AGG(url) answer_photos`;
  //  AND reported = 0 ORDER BY question_date DESC LIMIT 5`;
  pool.query(queryEntry, (error, results) => {
    console.log(results);
    /*
    let questionsArr = [];
    console.log('results', results);
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
      console.log('error in GetQuestions', error);
    }
    res.status(200).json(resObj);
*/

    res.send(results);
  });
};

const getAnswers = (req, res) => {
  let answersArr = [];

  const resObj = {
    question: null || results.rows[0].question_id,
    page: 0, //  TODO: change later
    count: 5, // TODO:  some conditional like 5 || 'whatever is from the req.body
    results: answersArr
  };

  pool.query(queryEntry, valArr, (error, results) => {
    if (error) {
      console.log('error', error);
    }
    console.log(results);
    // results.rows.forEach((answer) => {
    //   const answerObj = {
    //     answer_id: answer.id,
    //     body: answer.body,
    //     date: answer.date,
    //     answerer_name: answer.answerer_name,
    //     email: answer.answerer_email,
    //     helpfulness: answer.question_helpfulness,
    //     photos: []
    //   };
    //   answersArr.push(answerObj);
    // });
  });
  res.status(200).json(resObj);

  // res.status(200).send(results.rows);
  // res.status(200).json(resObj);
};

const postQuestion = (req, res) => {
  // TODO: fix adding values
  const { body, name, email } = req.body;
  let valArr = [body, name, email];
  console.log('req.body => ', req.body);

  const queryEntry = `INSERT INTO questions (question_body, asker_name, asker_email) VALUES (?, ?, ?)`;
  pool.query(queryEntry, valArr, (error, results) => {
    if (error) {
      console.log('error', error);
    }
    res.status(201).json(valArr);
  });
};

const postAnswer = (req, res) => {
  // TODO: fix this query

  const { body, name, email, photos } = req.body;
  const valArr = [body, name, email, photos];

  const queryEntry = `INSERT INTO answers (body, answerer_name, answerer_email) VALUES (?, ?, ?, ?)`;
  pool.query(queryEntry, valArr, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).send(valArr);
  });
};

const helpfulQuestion = (req, res) => {
  // TODO: fix this query

  const question_id = parseInt(req.params.id);
  let { helpful } = req.body;

  const queryEntry = `UPDATE questions SET helpful = $1 WHERE question_id = $2`;
  pool.query(queryEntry, [helpful++, question_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows);
  });
};

const reportQuestion = (req, res) => {
  // TODO: fix this query

  // TODO: if reported != 0 do not send as part of GET
  const question_id = parseInt(req.params.id);
  const { reported } = req.body;

  const queryEntry = `UPDATE questions SET helpful = $1 WHERE question_id = $2`;

  pool.query(queryEntry, [reported, question_id], (error, results) => {
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
