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

  // GET ROUTES - Working routes
  // answers - reordered because of confusion with the questions routes
  .get('/qa/:question_id/answers/:page?/:count?', getAnswers)
  .get('/qa/:product_id/:page?/:count?', getQuestions)

  // POST ROUTES
  .post('/qa/:product_id', postQuestion)
  // post an answer
  .post('/qa/:question_id/answers', postAnswer)

  // PUT ROUTES
  // Questions - Bth routes working
  .put('/qa/question/:question_id/helpful', helpfulQuestion)
  .put('/qa/question/:question_id/report', reportQuestion)

  // Answers - Both routes working
  .put('/qa/answer/:answer_id/helpful', helpfulAnswer)
  .put('/qa/answer/:answer_id/report', reportAnswer);

module.exports = router;
