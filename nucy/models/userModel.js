const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:[validator.isEmail, 'please enter valid email address']
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
