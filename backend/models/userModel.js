const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: String, 
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
