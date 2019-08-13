const frisby = require('frisby');

const PORT = process.env.PORT || 4000;

// Frisby Default Test
it('should be a teapot', () => {
  return frisby.get('http://httpbin.org/status/418').expect('status', 418);
});

// GET TESTS
describe('GET Questions', () => {
  const prod_id = Math.floor(Math.random() * 1000);
  it('should return a 200 status', () =>
    frisby.get('http://localhost:4000/qa/1').expect('status', 200));
  it('should return questions for a product_id', () => {
    return frisby
      .get(`http://localhost:4000/qa/${prod_id}`)
      .expect('json', 'product_id', prod_id);
  });

  it('should return application/json', () =>
    frisby
      .get('http://localhost:4000/qa/1')
      .expect('header', 'Content-Type', 'application/json; charset=utf-8'));
});

describe('GET Answers', () => {
  const question_id = Math.floor(Math.random() * 1000);
  it('should returna a 200 status', () =>
    frisby.get('http://localhost:4000/qa/1/answers').expect('status', 200));
  it('should return answers for a question_id', () => {
    return frisby
      .get(`http://localhost:4000/qa/${question_id}/answers`)
      .expect('json', 'question', question_id);
  });
  it('should return application/json', () =>
    frisby
      .get('http://localhost:4000/qa/1/answers')
      .expect('header', 'Content-Type', 'application/json; charset=utf-8'));
});

// POSTS TESTS

// PUT TESTS
describe('PUT Question Helpfulness', () => {
  const product_id = Math.ceil(Math.random() * 1000000);
  it('should return a 204 status', () =>
    frisby
      .put('http://localhost:4000/qa/question/1/helpful')
      .expect('status', 204));
  it('should increment question helpfulness by 1', () => {
    let question_id = null;
    let helpfulness = null;
    return frisby
      .get(`http://localhost:4000/qa/${product_id}`)
      .then((req) => {
        const question = JSON.parse(req.body).results[0];
        question_id = question.question_id;
        helpfulness = question.question_helpfulness;
        return frisby.put(
          `http://localhost:4000/qa/question/${question_id}/helpful`
        );
      })
      .then(() => frisby.get(`http://localhost:4000/qa/${product_id}`))
      .then((req) => {
        const question = JSON.parse(req.body).results[0];
        expect(question.question_helpfulness).toBe(helpfulness + 1);
      });
  });
});

describe('PUT Answer Helpfulness', () => {
  const question_id = Math.ceil(Math.random() * 1000000);
  it('should return a 204 status', () =>
    frisby
      .put('http://localhost:4000/qa/answer/1/helpful')
      .expect('status', 204));
  it('should increment answer helpfulness by 1', () => {
    let answer_id = null;
    let helpfulness = null;
    return frisby
      .get(`http://localhost:4000/qa/${question_id}/answers`)
      .then((req) => {
        const answer = JSON.parse(req.body).results[0];
        answer_id = answer.answer_id;
        helpfulness = answer.helpfulness;
        return frisby.put(
          `http://localhost:4000/qa/answer/${answer_id}/helpful`
        );
      })
      .then(() => frisby.get(`http://localhost:4000/qa/${question_id}/answers`))
      .then((req) => {
        const answer = JSON.parse(req.body).results[0];
        expect(answer.helpfulness).toBe(helpfulness + 1);
      });
  });
});

// PUT Report
describe('PUT Question Reported', () => {
  it('should return a 204 status', () =>
    frisby
      .put('http://localhost:4000/qa/question/1/report')
      .expect('status', 204));
  it('should set a question as reported', () => {
    const product_id = Math.ceil(Math.random() * 1000000);
    let initialQuestion = null;
    return frisby
      .get(`http://localhost:4000/qa/${product_id}`)
      .then((req) => {
        const question = JSON.parse(req.body).results[0];
        initialQuestion = question ? question.answer_id : 0;
        return frisby.put(
          `http://localhost:4000/qa/question/${initialQuestion}/report`
        );
      })
      .then(() => frisby.get(`http://localhost:4000/qa/${product_id}`))
      .then((req) => {
        const question = JSON.parse(req.body).results[0];
        const nextQuestion = question ? question.question_id : 1;
        expect(nextQuestion).not.toBe(initialQuestion);
      });
  });
});

describe('PUT Answer Reported', () => {
  it('should return status 204', () =>
    frisby
      .put('http://localhost:4000/qa/answer/1/report')
      .expect('status', 204));
  it('should mark an answer as reported', () => {
    const question_id = Math.ceil(Math.random() * 1000000);
    let initialAnswer = null;
    return frisby
      .get(`http://localhost:4000/qa/${question_id}/answers`)
      .then((req) => {
        const answer = JSON.parse(req.body).results[0];
        initialAnswer = answer ? answer.answer_id : 0;
        return frisby.put(
          `http://localhost:4000/qa/answer/${initialAnswer}/report`
        );
      })
      .then(() => frisby.get(`http://localhost:4000/qa/${question_id}/answers`))
      .then((req) => {
        const answer = JSON.parse(req.body).results[0];
        const nextAnswer = answer ? answer.answer_id : 1;
        expect(nextAnswer).not.toBe(initialAnswer);
      });
  });
});
