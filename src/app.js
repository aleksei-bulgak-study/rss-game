var express = require('express');
const bodyParser = require('body-parser');

const asyncHandler = require('./utils/utils')
const ScoreModel = require('./mongo/mongo');

const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/scores',
  asyncHandler(async (req, res) => {
    const scores = await ScoreModel.load();

    res.json(scores);
    res.end();
  })
);
app.post('/scores',
  asyncHandler(async (req, res) => {
    const result = await ScoreModel.create(req.body);

    res.json(result);
    res.end();
  })
);

app.listen(PORT);