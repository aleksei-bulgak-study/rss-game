const mongoose = require('mongoose');

const MONGO_URL = process.env.URL;
const MONGO_PORT = process.env.PORT;

module.exports = mongoose.connect(`${MONGO_URL}:${MONGO_PORT}`);