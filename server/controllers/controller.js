const models = require('../models/models.js');

// Controller for Testing purposes
const dummyController = (req, res) => {
  console.log(`inside dummy controller`);
  models
    .dummyModel()
    .then(() => {
      res.send(`dummy models executed`);
    })
    .catch((err) => {
      console.log('err inside dummy controller from dummy model', err);
    });
};

// GET Controllers

// Working
const getQuestions = (req, res) => {
  console.time();

  const { product_id, count, page } = req.params;

  console.log('req.params inside getQuestions \n', req.params);

  let questionObj = {
    product_id: product_id,
    results: []
  };

  models
    .getQuestions(product_id, count, page, questionObj)
    .then(() => {
      console.timeEnd();
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

  const { question_id, page, count } = req.params;

  console.log('req.params inside getAnswers \n', req.params);

  models
    .getAnswers(question_id, count, page) 
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

  const { body, name, email } = req.body;

  models
    .postQuestion(req.params.product_id, body, name, email)
    .then(() => {
      console.timeEnd();
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('err in post Question \n', err);
      res.sendStatus(500);
    });
};

const postAnswer = (req, res) => {
  console.time();

  console.log('req.params.product_id', req.params.question_id);

  const { body, name, email, photos } = req.body;

  models
    .postAnswer((req.params.question_id, body, name, email, photos))
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
