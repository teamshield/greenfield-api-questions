// const model = require('../models/models.js');
const { answerModel, questionModel } = require('../models/models.js');

module.exports = {
  getQuestions: (req, res) => {
    console.time();
    const { product_id, page = 1, count = 5 } = req.params;
    let data = {
      product_id: product_id,
      results: []
    };

    answerModel
      .getQuestions(product_id, count, data)
      .then(() => {
        console.timeEnd();
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  addQuestion: (req, res) => {
    console.time();
    console.log('req.params.product_id', req.params.product_id);
    console.log('req.body', req.body);
    res.sendStatus(201);
  },

  getAnswers: (req, res) => {
    console.time();
    const { question_id, page = 1, count = 5 } = req.params;

    questionModel
      .getAnswers(question_id, count)
      .then((result) => {
        let data = {
          question: question_id,
          page: page - 1,
          count: count,
          results: result
        };

        console.timeEnd();
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};
