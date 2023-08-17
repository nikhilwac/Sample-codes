const mongoose = require('mongoose');

module.exports.mySchema = new mongoose.Schema({
  title: String,
  body: String,
  date: Date
});
