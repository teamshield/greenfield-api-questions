const db = require('../database.js');

module.exports = {
  getAnswers: (question_id, count) => {
    return db.any(
      `SELECT answer_id, body, date, answerer_name, helpfulness, photos 
        FROM answers WHERE question_id = $1 AND report = 0 limit $2`,
      [question_id, count]
    );
  },
  getQuestions: (product_id, count, data) => {
    return db
      .any(
        'SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2',
        [product_id, count]
      )
      .then((result) => {
        data.results = result;

        return Promise.all(
          data.results.map((question) => {
            question.answers = {};
            return db
              .any(
                'SELECT answer_id AS id, body, date, answerer_name, helpfulness, photos FROM answers WHERE question_id = $1 AND report = 0',
                [question.question_id]
              )
              .then((answers) => {
                for (let answer of answers) {
                  question.answers[answer.id] = answer;
                }
              });
          })
        );
      });
  }
};
