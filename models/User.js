import { Schema, model } from 'mongoose';

// Define your schema
const UserSchema = new Schema({
  cookie: {
    type: String,
    required: true
  }
  // other fields...
});

// Compile and export the model
export default model('User', UserSchema, 'Users');