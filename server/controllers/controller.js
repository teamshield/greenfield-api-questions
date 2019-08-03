const models = require('../models/models.js');

// Controller for Testing purposes
const dummyController = (req, res) => {
  console.time();
  const { product_id, page = 1, count = 5 } = req.params;
  console.log('product_id: ', product_id, '\n count: ', count);
  let questionObj = {
    product_id: product_id,
    results: []
  };

  models
    .dummyModel(product_id, count, questionObj)
    .then(() => {
      console.timeEnd();
      res.send(questionObj);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// Get Controllers

// Working
const getQuestions = (req, res) => {
  console.time();
  const { product_id, page = 1, count = 5 } = req.params;
  console.log('product_id: ', product_id, '\n count: ', count);
  let questionObj = {
    product_id: product_id,
    results: []
  };

  models
    .dummyModel(product_id, count, questionObj)
    .then(() => {
      console.timeEnd();
      res.send(questionObj);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// Working
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
  console.time();
  console.timeEnd();
};

const reportQuestion = (req, res) => {
  console.time();
  console.timeEnd();
};

// Put Answers
const helpfulAnswer = (req, res) => {
  console.time();
  console.timeEnd();
};

const reportAnswer = (req, res) => {
  console.time();
  console.timeEnd();
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
