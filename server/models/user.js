// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  parentName: String,
  childName: String,
  email: { type: String, required: true, unique: true },
  password: String,
  username: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
