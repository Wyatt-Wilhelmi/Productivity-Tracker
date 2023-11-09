const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const User = require('../../models/User.js');

const { connect, connection } = mongoose;

module.exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

  if (!MONGODB_URI) {
    return { statusCode: 500, body: 'MONGODB_URI is not defined' };
  }

  if (connection.readyState !== 1) {
    try {
      await connect(MONGODB_URI, {
        dbName: MONGODB_DATABASE,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (err) {
      console.error('Error connecting to the database: ', err);
      return { statusCode: 500, body: 'Database connection error' };
    }
  }

  try {
    const { cookieValue } = JSON.parse(event.body);

    let newCookieValue = cookieValue;
    if (!newCookieValue) {
      newCookieValue = uuidv4();
    }

    const user = await User.findOne({ cookie: newCookieValue });

    if (!user) {
      const newUser = new User({ cookie: newCookieValue });
      await newUser.save();
      const newUserID = await User.findOne({cookie: newCookieValue}, '_id');
      return {
        statusCode: 201,
        headers: {
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; secure'
        },
        body: JSON.stringify({userID: newUserID, cookieValue: newCookieValue})
      };
    }

    const newUserID = await User.findOne({cookie: newCookieValue}, '_id');
    return { 
      statusCode: 200,
      body: JSON.stringify({userID: newUserID})
    };

  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
}
