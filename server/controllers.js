const queries = require('./queries');

const dummyController = (req, res) => {
  // res.json({ info: 'Node.js, Express, and Postgres API' });
  res.send(`fixed start script`);
};

const getQuestions = (res, req) => {
  res.send(`get questiosn working`);
};

const getAnswers = (res, req) => {
  //
};

const postQuestion = (res, req) => {
  //
};

const postAnswer = (req, res) => {
  //
};

const helpfulQuestion = (req, res) => {
  //
};

const reportQuestion = (req, res) => {
  //
};

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
