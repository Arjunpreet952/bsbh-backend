const mongoose = require('mongoose');

const AuthoritySchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Authority', AuthoritySchema);
