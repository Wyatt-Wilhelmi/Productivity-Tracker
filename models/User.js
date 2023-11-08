import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define your schema
const UserSchema = new Schema({
  cookie: {
    type: String,
    required: true
  }
});

// Compile and export the model
export default model('User', UserSchema, 'Users');