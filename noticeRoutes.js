const express = require('express');
const noticeRouter = express.Router();
const Notice = require('../models/temp');

// Get all notices
noticeRouter.get('/', async (req, res) => {
  const all = await Notice.find().sort({ date: -1 });
  res.json(all);
});

// Create a new notice
noticeRouter.post('/', async (req, res) => {
  const { title, description } = req.body;
  const notice = new Notice({ title, description });
  await notice.save();
  res.json({ message: 'Notice created' });
});

// Delete a notice
noticeRouter.delete('/:id', async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Notice deleted' });
});

module.exports = noticeRouter;
