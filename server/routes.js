const router = require('express').Router();
const controller = require('./controllers.js');

router
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
