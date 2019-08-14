const db = require('../database.js');

// Get request from redis, if not available, check database, on sucess, add to reddis

// TEST MODEL - TODO: delete
const dummyModel = () => {
  console.log(`inside test endpoint`);
  db.any(`SELECT * FROM questions WHERE product_id = 1`)
    .then((result) => {
      console.log('result in models', result);
      return result;
    })
    .catch((err) => {
      console.log('err inside dummy model', err);
    });
};

// GET REQUESTS
const getQuestions = (product_id, count, offset) => {
  const questionQuery = `SELECT question_id, question_body, question_date, asker_name, question_helpfulness FROM questions WHERE product_id = $1 AND reported = 0 LIMIT $2 OFFSET $3`;

  const answersQuery = `SELECT answer_id AS id, body, date, answerer_name, helpfulness, photos FROM answers WHERE question_id = $1 AND report = 0`;

  return db.tx((t) => {
    return t
      .map(questionQuery, [product_id, count, offset], (question) => {
        question.answers = {};
        return t.any(answersQuery, [question.question_id]).then((answers) => {
          for (let answer of answers) {
            question.answers[answer.id] = answer;
          }
          return question;
        });
      })
      .then(t.batch);
  });
};

const getAnswers = (question_id, count, offset) => {
  return db.any(
    `SELECT answer_id, body, date, answerer_name, helpfulness, photos 
        FROM answers WHERE question_id = $1 AND report = 0 LIMIT $2 OFFSET $3`,
    [question_id, count, offset]
  );
};

// POST REQUESTS
const postQuestion = (product_id, { body, name, email }) => {
  const questionQuery = `INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES ($1, $2, $3, $4)`;
  return db.any(questionQuery, [product_id, body, name, email]);
};
const postAnswer = (question_id, { body, name, email, photos }) => {
  return db
    .one(
      `INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4) RETURNING answer_id`,
      [question_id, body, name, email]
    )
    .then(({ answer_id }) => {
      return Promise.all(
        photos.map((url) => {
          //insert the url and return the id
          //insert into answer photos object containing returned id and url
          return db
            .one(
              `INSERT INTO photos (answer_id, url) VALUES ($1, $2) RETURNING id;`,
              [answer_id, url]
            )
            .then(({ id }) => {
              let photo = JSON.stringify({ id, url });
              return db.any(
                `UPDATE answers SET photos = photos || $1::jsonb WHERE answer_id = $2;`,
                [photo, answer_id]
              );
            });
        })
      );
    });
};

// PUT REQUESTS
// Questions
const helpfulQuestion = (question_id) => {
  const questionQuery = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 where question_id = $1;`;
  return db.none(questionQuery, [question_id]);
};
const reportQuestion = (question_id) => {
  const questionQuery = `UPDATE questions SET reported = 1 where question_id = $1;`;
  return db.none(questionQuery, [question_id]);
};

// Answers
const helpfulAnswer = (answer_id) => {
  return db.none(
    `UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = $1;`,
    [answer_id]
  );
};
const reportAnswer = (answer_id) => {
  return db.none(`UPDATE answers SET report = 1 WHERE answer_id = $1;`, [
    answer_id
  ]);
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
