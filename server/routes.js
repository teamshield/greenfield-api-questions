const router = require('express').Router();

// Reference to old contorllers
// const {
//   dummyController,
//   getQuestions,
//   getAnswers,
//   postQuestion,
//   postAnswer,
//   helpfulQuestion,
//   reportQuestion,
//   helpfulAnswer,
//   reportAnswer
// } = require('./controllersDELETE.js/index.js');

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
  .get('/test', dummyController)
  .get('/test/:question_id', dummyController)
  .post('/test', dummyController)

  // questions - based on productId
  // .get('/qa/:product_id', getQuestions)
  .get('/qa', getQuestions)
  // answers - based on questionId
  .get('/qa/:question_id/answers', getAnswers)

  // post a question
  .post('/qa/:product_id', postQuestion)
  // post an answer
  .post('/qa/:question_id/answers', postAnswer)

  // question - helpful
  .put('/qa/question/:question_id/helpful', helpfulQuestion)
  // question - report
  .put('/qa/question/:question_id/report', reportQuestion)

  // answer - helpful
  .put('/qa/answer/:answer_id/helpful', helpfulAnswer)
  // answer - report
  .put('/qa/answer/:answer_id/report', reportAnswer);

module.exports = router;
