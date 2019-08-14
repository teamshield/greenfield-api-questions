const client = require('../redis-client.js')

const redisGetQuestions = (product_id, count, offset) => {
  client.getAsync(`q${product_id}c${count}o${offset}`)
}

const redisGetAnswers =  (question_id, count, offset) => client.getAsync(`a${question_id}c${count}o${offset}`),

const redisSetQuestions = (product_id, count, offset, result) => {
  client.set(`q${product_id}c${count}o${offset}`, result)
}

const redisSetAnswers = (question_id, count, offset, result) => {
  client.set(`a${question_id}c${count}o${offset}`, result)
}

const redisFlush = { redisFlush: () => redisClient.flushall() };

module.exports = { redisGetQuestions, redisGetAnswers, redisSetQuestions, redisSetAnswers, redisFlush };