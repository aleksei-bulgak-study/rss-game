var express = require('express');
const bodyParser = require('body-parser');

//require('./mongo/mongo');
const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/scores', (req, resp) => {
    //fetch data
    resp.send('test');
  })
app.post('/scores', (req, resp) => {
    // save
    resp.status(204).send();
  });

app.listen(PORT);