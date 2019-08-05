const router = require('express').Router();

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
} = require('./controllers/controller.js');

router
  // TEST ROUTES
  .get('/test', dummyController)
  .get('/test/:product_id', dummyController)
  .post('/test', dummyController)

  // GET ROUTES
  .get('/qa/:product_id', getQuestions)
  // answers - based on questionId
  .get('/qa/:question_id/answers', getAnswers)

  // POST ROUTES
  .post('/qa/:product_id', postQuestion)
  // post an answer
  .post('/qa/:question_id/answers', postAnswer)

  // PUT ROUTES
  // Questions
  .put('/qa/question/:question_id/helpful', helpfulQuestion)
  .put('/qa/question/:question_id/report', reportQuestion)

  // Answers
  .put('/qa/answer/:answer_id/helpful', helpfulAnswer)
  .put('/qa/answer/:answer_id/report', reportAnswer);

module.exports = router;
