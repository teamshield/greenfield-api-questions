const db = require('../database.js');

// Testing for db connection
// console.log('db from models \n', db);

// TEST MODEL - TODO: delete
const dummyModel = (product_id, count, data) => {
  const queryEntry = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2`;

  return db.any(queryEntry, [product_id, count]).then((result) => {
    data.results = result;
  });
};

// GET REQUESTS
const getQuestions = (product_id, count = 5, page = 0, data) => {
  const queryEntry = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2
  OFFSET $3`;

  const offset = (parseInt(page, 10) + 1) * parseInt(count, 10);

  console.log('\n\n page: ', page);
  console.log('count', count);
  console.log('offset', offset);

  return db
    .any(queryEntry, [product_id, count, page, offset])
    .then((result) => {
      data.results = result;

      const answerQuery = `SELECT answer_id AS id, body, date, answerer_name, helpfulness, photos FROM new_answers WHERE question_id = $1 AND report = 0`;

      return Promise.all(
        data.results.map((question) => {
          question.answers = {};
          return db.any(answerQuery, [question.question_id]).then((answers) => {
            answers.forEach((answer) => {
              question.answers[answer.id] = answer;
            });
          });
        })
      );
    });
};

const getAnswers = (question_id, count = 5, page = 0, data) => {
  // // FIXME: offsetting
  const queryEntry = `SELECT answer_id, body, date, answerer_name, helpfulness, photos FROM new_answers WHERE question_id = $1 AND report = 0 LIMIT $2 OFFSET $3`;

  const offset = (page + 1) * count;

  return db.any(queryEntry, [question_id, count, page, offset]);
};

// POST REQUESTS
const postQuestion = (product_id, reqBody) => {
  const queryEntry = `INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES ($1, $2, $3, $4) RETURNING id`;

  const { body, name, email } = reqBody;

  return db.any(queryEntry, [product_id, body, name, email, photos]);
};

const postAnswer = (question_id, reqBody) => {
  const queryEntry = `INSERT INTO new_answers (body, answerer_name, answerer_email, photos) VALUES ($, $, $, $, $, $) RETURNING id `;

  const { body, name, email, photos } = reqBody;

  return db.any(queryEntry, [question_id, body, name, email, photos]);
};

// PUT REQUESTS
// Questions
const helpfulQuestion = (question_id) => {
  const queryEntry = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = $1`;

  return db.any(queryEntry, [question_id]);
};

const reportQuestion = (question_id) => {
  const queryEntry = `UPDATE questions SET reported = reported + 1 WHERE question_id = $1`;

  return db.any(queryEntry, [question_id]);
};

// Answers
const helpfulAnswer = (answer_id) => {
  const queryEntry = `UPDATE new_answers SET helpfulness = helpfulness + 1 WHERE answer_id = $1`;

  return db.any(queryEntry, [answer_id]);
};

const reportAnswer = (answer_id) => {
  const queryEntry = `UPDATE new_answers SET report = report + 1 WHERE answer_id = $1`;

  return db.any(queryEntry, [answer_id]);
};

module.exports = {
  dummyModel,
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  helpfulQuestion,
  reportQuestion,
  helpfulAnswer,
  reportAnswer
};
