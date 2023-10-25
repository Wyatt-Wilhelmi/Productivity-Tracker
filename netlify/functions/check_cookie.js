// Located in netlify/functions/check-cookie.js
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../../models/User.js');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

  if (!MONGODB_URI) {
    return { statusCode: 500, body: 'MONGODB_URI is not defined' };
  }

  // Check if mongoose is not connected before trying to connect
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DATABASE, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to the Database successfully');
    })
    .catch(err => {
      console.error('Error connecting to the database: ', err);
    });
  }

  try {
    const { cookieValue } = JSON.parse(event.body);

    if (!cookieValue) {
      return { statusCode: 400, body: "Bad Request: No cookie provided" };
    }

    const user = await User.findOne({ cookie: cookieValue });

    if (!user) {
      const newUser = new User({ cookie: cookieValue });
      await newUser.save();
      return { statusCode: 200, body: JSON.stringify({ message: "New user created" }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "User already exists" }) };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
  // No need to close connection in a serverless environment
};


