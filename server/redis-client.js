const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient({ url: process.env.REDIS_URL });
client.on('connect', (err) => {
  if (err) {
    console.log(err);
  }
  client.flushdb((err, success) => {
    if (err) {
      console.log(err);
    }
    console.log(success);
  });
});

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
  flushAsync: promisify(client.flushdb).bind(client)
};
