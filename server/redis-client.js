const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient({
  port: 6379,
  host: process.env.REDIS_URL || '120.0.0.1'
});

client.on('connect', (err) => {
  if (err) {
    console.log(`redis connect err`, err);
  }
  client.flushdb((err, success) => {
    if (err) {
      console.log(`redis flush db`, err);
    }
    console.log(`redis flush db sucess`, success);
  });
});

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  flushAsync: promisify(client.flushdb).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
