const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: String,
  url: String, // The path to the uploaded photo.
});

module.exports = mongoose.model('Photo', photoSchema);
