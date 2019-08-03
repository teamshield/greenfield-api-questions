const db = require('../database.js');

// test query
const dummyModel = (product_id, count, data) => {
  const queryEntry = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2`;

  return db.any(queryEntry, [product_id, count]).then((result) => {
    data.results = result;
  });
};

// GET Models
const getQuestions = (product_id, count, data) => {
  const queryEntry = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2`;

  return db.any(queryEntry, [product_id, count]).then((result) => {
    data.results = result;

    const answerQuery = `SELECT answer_id AS id, body, date, answerer_name, helpfulness, photos FROM answers WHERE question_id = $1 AND report = 0`;

    return Promise.all(
      data.results.map((question) => {
        question.answers = {};
        return db.any(answerQuery, [question.question_id]).then((answers) => {
          for (let answer of answers) {
            question.answers[answer.id] = answer;
          }
        });
      })
    );
  });
};

const getAnswers = (question_id, count, data) => {
  // const queryEntry = `SELECT answer_id, body, date, answerer_name, helpfulness FROM answers WHERE question_id = $1 AND report = 0 LIMIT $2`;

  // // FIXME: query when photos are in a column
  const queryEntry = `SELECT answer_id, body, date, answerer_name, helpfulness, photos FROM answers WHERE question_id = $1 AND report = 0 limit $2`;

  const queryIndex = `SELECT`

  return db.any(queryEntry, [question_id, count]);
};

module.exports = {
  dummyModel,
  getQuestions,
  getAnswers
};
