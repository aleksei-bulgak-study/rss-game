const mongoose = require('mongoose');
const ScoreModel = require('./model/scoreModel');

mongoose.connect(process.env.HOST);
module.exports = ScoreModel;