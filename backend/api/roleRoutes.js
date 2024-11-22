const express = require('express');
const router = express.Router();
const Role = require('../models/roleModel');

// Get all roles
router.get('/', async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
});

// Create a new role
router.post('/', async (req, res) => {
    const newRole = new Role(req.body);
    await newRole.save();
    res.json(newRole);
});

// Update role
router.put('/:id', async (req, res) => {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRole);
});

// Delete role
router.delete('/:id', async (req, res) => {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted' });
});

module.exports = router;
