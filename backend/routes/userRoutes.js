const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find().populate('role');
    res.json(users);
});

// Create a new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

// Update user
router.put('/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
});

// Delete user
router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

module.exports = router;
