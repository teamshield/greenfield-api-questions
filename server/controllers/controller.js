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
  const { product_id, count, page } = req.params;

  console.log('req.params inside getQuestions \n', req.params);

  let questionObj = {
    product_id: product_id,
    results: []
  };

  models
    .getQuestions(product_id, count, page, questionObj)
    .then(() => {
      res.status(200).send(questionObj);
    })
    .catch((err) => {
      console.log('err in Get Request', err);
      res.sendStatus(500);
    });
};

// Working
const getAnswers = (req, res) => {
  const { question_id, page, count } = req.params;

  models
    .getAnswers(question_id, count, page)
    .then((result) => {
      let data = {
        question: question_id,
        page: page - 1,
        count: count,
        results: result
      };

      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// POST Methods
const postQuestion = (req, res) => {
  const { body, asker_name, email } = req.body;

  models
    .postQuestion(req.params.product_id, body, asker_name, email)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('err in post Question \n', err);
      res.sendStatus(500);
    });
};

const postAnswer = (req, res) => {
  console.log(
    '\n\n\n CONTROLLERS req.params.product_id',
    req.params.question_id
  );

  const { body, answerer_name, email, photos } = req.body;

  models
    // .postAnswer(req.params.question_id, body, answerer_name, email)
    .postAnswer(req.params.question_id, body, answerer_name, email, photos)
    .then(() => {
      res.send(`sucess`).status(201);
      // res.sendStatus(201);
    })
    .catch((err) => {
      console.log('err in posting answers', err);
      res.sendStatus(500);
    });
};

// PUT Methods
// Questions
const helpfulQuestion = (req, res) => {
  const { question_id } = req.params;
  models
    .helpfulQuestion(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('err in helpfulQuestion', err).sendStatus(500);
    });
};

const reportQuestion = (req, res) => {
  const { question_id } = req.params;
  models
    .reportQuestion(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('err in report answers \n', err).sendStatus(500);
    });
};

// Answers
const helpfulAnswer = (req, res) => {
  const { answer_id } = req.params;
  models
    .helpfulAnswer(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('err in helpfulAnswer', err).sendStatus(500);
    });
};

const reportAnswer = (req, res) => {
  const { answer_id } = req.params;
  models
    .reportAnswer(answer_id)
    .then(() => {
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
