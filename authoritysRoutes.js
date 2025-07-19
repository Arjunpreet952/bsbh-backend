const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorityRouter = express.Router();
const Authority = require('../models/Authoritys');

// POST: Signup
authorityRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new Authority({ username, password: hash });
    await newUser.save();
    res.json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ error: 'Signup failed', details: err });
  }
});

// POST: Login
authorityRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Authority.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
});

module.exports = authorityRouter;
