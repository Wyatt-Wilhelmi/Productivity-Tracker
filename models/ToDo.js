import { Schema, SchemaTypes, model } from 'mongoose';

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
    type: SchemaTypes.ObjectId,
    required: true
  }
});

// Compile and export the model
export default model('Todo', TodoSchema);
