const router = require('express').Router();

const {
  dummyController,
  getQuestions
  // ,
  // // getAnswers,
  // postQuestion,
  // // postAnswer,
  // helpfulQuestion,
  // reportQuestion
  // // helpfulAnswer,
  // reportAnswer
} = require('./controllers/controller.js');

router
  // TEST ROUTES
  .get('/', (req, res) => {
    res.send(`Landing Page`);
    console.log(`hit landing page`);
  })
  .get('/test', dummyController)

  // // GET ROUTES - Working routes
  // // answers - reordered because of confusion with the questions routes
  // .get('/qa/:question_id/answers/:count?/:page?', getAnswers)
  .get('/qa/:product_id/:count?/:page?', getQuestions);

// // POST ROUTES
// .post('/qa/:product_id', postQuestion)
// // .post('/qa/:question_id/answers', postAnswer)

// // PUT ROUTES
// // Questions - Bth routes working
// .put('/qa/question/:question_id/helpful', helpfulQuestion)
// .put('/qa/question/:question_id/report', reportQuestion)

// // Answers - Both routes working
// .put('/qa/answer/:answer_id/helpful', helpfulAnswer)
// .put('/qa/answer/:answer_id/report', reportAnswer);

module.exports = router;
