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

// GET Controllers

// Working
const getQuestions = (req, res) => {
  console.time();

  const { product_id, page = 1, count = 5 } = req.params;

  let questionObj = {
    product_id: product_id,
    results: []
  };

  models
    .getQuestions(product_id, count, questionObj)
    .then(() => {
      console.timeEnd();
      // console.log(questionObj);
      res.status(200).send(questionObj);
    })
    .catch((err) => {
      console.log('err in Get Request', err);
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
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// POST Methods
const postQuestion = (req, res) => {
  console.time();
  console.log('req.params.product_id', req.params.product_id);
  console.log('req.body', req.body);

  const { product_id, body } = req.params;

  models
    .postQuestion(product_id, body)
    .then(() => {
      console.timeEnd();
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('err in post Answer \n', err);
      res.sendStatus(500);
    });
};

const postAnswer = (req, res) => {
  console.time();

  const { question_id, body } = req.params;

  models
    .postAnswer((question_id, body))
    .then(() => {
      console.timeEnd();
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('err in posting answers', err);
      res.sendStatus(500);
    });
};

// PUT Methods
// Questions
const helpfulQuestion = (req, res) => {
  console.time();

  const { question_id } = req.params;
  models
    .helpfulQuestion(question_id)
    .then(() => {
      console.timeEnd();
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('err in helpfulQuestion', err).sendStatus(500);
    });
};

const reportQuestion = (req, res) => {
  console.time();

  const { question_id } = req.params;
  models
    .reportQuestion(question_id)
    .then(() => {
      console.timeEnd();
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('err in report answers \n', err).sendStatus(500);
    });
};

// Answers
const helpfulAnswer = (req, res) => {
  console.time();

  const { answer_id } = req.params;
  models
    .helpfulAnswer(answer_id)
    .then(() => {
      console.timeEnd();
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('err in helpfulAnswer', err).sendStatus(500);
    });
};

const reportAnswer = (req, res) => {
  console.time();

  const { answer_id } = req.params;
  models
    .reportAnswer(answer_id)
    .then(() => {
      console.timeEnd();
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('err in report answers \n', err).sendStatus(500);
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
