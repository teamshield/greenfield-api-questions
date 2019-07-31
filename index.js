const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// An instance of express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
