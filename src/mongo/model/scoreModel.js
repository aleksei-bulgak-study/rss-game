const mongoose = require('mongoose');
const ScoreSchema = require('../schema/scoreSchema');

const ScoreModel = mongoose.model('Score', ScoreSchema);

module.exports.load = async () => {
  const response = await ScoreModel
    .find({})
    .sort('level')
    .limit(10)
    .exec();
  return response.map(score => ({ name: score.name, level: score.level}));
}

module.exports.create = async (score) => {
  const response = await ScoreModel.create({
    _id: mongoose.Types.ObjectId(),
    name: score.name,
    level: score.level
  });
  return response;
}