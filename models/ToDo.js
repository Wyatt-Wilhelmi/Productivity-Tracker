const mongoose = require('mongoose');

// Define your schema
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  // other fields...
});

// Compile and export the model
module.exports = mongoose.model('Todo', TodoSchema);
