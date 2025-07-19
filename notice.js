const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notice', NoticeSchema);
