const { promisify } = require('util');

const model = require('../models/models.js');
const client = require('../redis-client.js');

// Controller for Testing purposes
const dummyController = (req, res) =>
  console.log(`\n\n\n\n inside dummy controller`);
// res.send(`hello world`);

model
  .dummyModel()
  .then((result) => {
    console.log('result inside controller', result);
    // res.send(`dummy models executed`);
    res.send(result).status(200);
  })
  .catch((err) => {
    console.log('err inside dummy controller from dummy model', err);
  });
// };

// const getQuestions = (req, res) => {
//   res.send(`hello`);
// };

// GET REQUESTS
const getQuestions = async (req, res) => {
  // redis cache implementation
  const url = `${req.headers.host}${req.url}`;
  console.log('url', url);

  const cache = await client.getAsync(url);
  if (cache) {
    const result = await client.getAsync(url);
    res.send(JSON.parse(result));
  } else {
    const { product_id, page = 1, count = 5 } = req.params;
    const offset = parseInt(page) === 1 ? 0 : page * count;
    model
      .getQuestions(product_id, count, offset)
      .then((results) => {
        const questionObj = {
          product_id,
          results
        };
        return client.setAsync(url, JSON.stringify(questionObj)).then(() => {
          res.send(questionObj);
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};

const getAnswers = async (req, res) => {
  const url = req.headers.host + '/' + req.url;
  const cache = await client.getAsync(url);

  if (cache) {
    const result = await client.getAsync(url);
    res.send(JSON.parse(result));
  } else {
    const { question_id, page = 1, count = 5 } = req.params;
    const offset = parseInt(page) === 1 ? 0 : page * count;

    model
      .getAnswers(question_id, count, offset)
      .then((result) => {
        const answerObj = {
          question: question_id,
          page: page,
          count: count,
          results: result
        };
        return client
          .setAsync(url, JSON.stringify(answerObj))
          .then((result) => {
            res.send(answerObj);
          });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};

// POST REQUESTS
const postQuestion = (req, res) => {
  const { product_id } = req.params;
  const { body } = req;

  model
    .postQuestion(product_id, body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const postAnswer = (req, res) => {
  const { question_id } = req.params;
  const { body } = req;

  model
    .postAnswer(question_id, body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// PUT REQUETS
// Questions
const helpfulQuestion = (req, res) => {
  const { question_id } = req.params;
  model
    .helpfulQuestion(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const reportQuestion = (req, res) => {
  const { question_id } = req.params;
  model
    .reportQuestion(question_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

// Answers
const helpfulAnswer = (req, res) => {
  const { answer_id } = req.params;
  model
    .helpfulAnswer(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const reportAnswer = (req, res) => {
  const { answer_id } = req.params;

  model
    .reportAnswer(answer_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
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
