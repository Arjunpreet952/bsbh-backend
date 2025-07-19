const express = require('express');
const complaintRouter = express.Router();
const Complaint = require('../models/Complaints');

// GET all complaints
complaintRouter.get('/all', async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

// GET only resolved complaints
complaintRouter.get('/resolved', async (req, res) => {
  const resolved = await Complaint.find({ status: 'Resolved' });
  res.json(resolved);
});

// POST: Register a new complaint
complaintRouter.post('/', async (req, res) => {
  const complaint = new Complaint(req.body);
  await complaint.save();
  res.json({ message: 'Complaint registered' });
});

// PATCH: Update complaint status
complaintRouter.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const updated = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status, updatedAt: new Date() },
    { new: true }
  );
  res.json(updated);
});

// POST: Submit feedback on resolved complaint
complaintRouter.post('/:id/feedback', async (req, res) => {
  const { rating, comment } = req.body;
  const updated = await Complaint.findByIdAndUpdate(
    req.params.id,
    { feedback: { rating, comment } },
    { new: true }
  );
  res.json(updated);
});

module.exports = complaintRouter;
