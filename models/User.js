const mongoose = require('mongoose');

// Define your schema
const UserSchema = new mongoose.Schema({
  cookie: {
    type: String,
    required: true
  }
  // other fields...
});

// Compile and export the model
module.exports = mongoose.model('User', UserSchema, 'Users');