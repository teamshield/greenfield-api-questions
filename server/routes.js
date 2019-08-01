let router = require('express').Router();
// let controller = require('./controllers.js');
const {
  dummyController,
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  helpfulQuestion,
  reportQuestion,
  helpfulAnswer,
  reportAnswer
} = require('./controllers.js');

router
  // .get('/test', controller.dummyController)
  .get('/test', dummyController)

  // questios - based on productId
  .get('/qa/:product_id')
  // answers - based on questionId
  .get('/qa/:question_id/answers')

  // post a question
  .post('/qa/:product_id')
  // post an answer
  .post('/qa/:question_id/answers')

  // question - helpful
  .put('/qa/question/:question_id/helpful')
  // question - report
  .put('/qa/question/:question_id/report')
  // answer - helpful
  .put('/qa/answer/:answer_id/helpful')
  // answer - report
  .put('/qa/answer/:answer_id/report');

module.exports = router;
