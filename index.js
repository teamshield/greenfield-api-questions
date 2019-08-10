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
app.get(`loaderio-031062197befdc8047c246214c7f9648`, (req, res) => {
  res.sendFile(`/home/ec2-user/greenfield-api-questions/loader`);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
