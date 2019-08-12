const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./server/routes.js');

// An instance of express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', router);

// FIXME: fix this endpoint for testing
app.get(`/loaderio-d8cce25fbec84fd4dbb8f89d6de3bf65`, (req, res) => {
  res.sendFile('/loader/d8cce25fbec84fd4dbb8f89d6de3bf65.txt');
});

app.get('/health', (req, res) => {
  res.send(`health`).status(200);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
