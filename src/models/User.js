const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  email: String
})

module.exports = mongoose.model('User', UserSchema);