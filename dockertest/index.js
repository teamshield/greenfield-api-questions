const express = require('express');
const bodyParser = require('body-parser');

// An instance of express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`a new message`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
