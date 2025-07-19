const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  roomNumber: String,
  phoneNumber: String,
  block: String,
  description: String,
  category: String,
  status: { type: String, default: 'Pending' },
  feedback: {
    rating: Number,
    comment: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
