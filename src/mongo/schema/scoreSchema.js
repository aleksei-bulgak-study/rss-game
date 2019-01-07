const mongoose = require('mongoose');

const ScoreSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  level: Number
});

module.exports = ScoreSchema;