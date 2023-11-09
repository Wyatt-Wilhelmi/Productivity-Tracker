const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

// Define your schema
const TodoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: String,
    required: true
  }
});

// Compile and export the model
module.exports = mongoose.model('Todo', TodoSchema, 'ToDoList');

