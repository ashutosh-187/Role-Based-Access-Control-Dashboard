const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import models
const Role = require('./models/roleModel');
const User = require('./models/userModel');

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes for Role Management

app.get('/api/roles', async (req, res) => {
  try {
    const roles = await Role.find(); 
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles' });
  }
});

app.post('/api/roles', async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newRole = new Role({ name, permissions });
    await newRole.save(); 
    res.status(201).json(newRole); 
  } catch (error) {
    res.status(500).json({ message: 'Error adding role' });
  }
});

app.put('/api/roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const updatedRole = await Role.findByIdAndUpdate(id, { name, permissions }, { new: true });
    if (!updatedRole) return res.status(404).json({ message: 'Role not found' });
    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: 'Error updating role' });
  }
});

app.delete('/api/roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findByIdAndDelete(id);
    if (!deletedRole) return res.status(404).json({ message: 'Role not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role' });
  }
});

// Routes for User Management

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    const newUser = new User({ name, email, role, status });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, role, status }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
