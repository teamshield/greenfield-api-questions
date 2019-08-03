const models = require('../models/models.js');

// Controller for Testing purposes
const dummyController = (req, res) => {
  console.time();
};

// Get Controllers
const getQuestions = (req, res) => {
  console.time();
  const { product_id, page = 1, count = 5 } = req.params;
  let data = {
    product_id: product_id,
    results: []
  };

  models
    .getQuestions(product_id, count, data)
    .then(() => {
      console.timeEnd();
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const getAnswers = (req, res) => {
  console.time();
  const { question_id, page = 1, count = 5 } = req.params;

  models
    .getAnswers(question_id, count)
    .then((result) => {
      let data = {
        question: question_id,
        page: page - 1,
        count: count,
        results: result
      };

      console.timeEnd();
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// Post Methods
const postQuestion = (req, res) => {
  console.time();
  console.log('req.params.product_id', req.params.product_id);
  console.log('req.body', req.body);
  res.sendStatus(201);
};

const postAnswer = (req, res) => {
  //
};

// Put Questions
const helpfulQuestion = (req, res) => {
  //
};

const reportQuestion = (req, res) => {
  //
};

// Put Answers
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
