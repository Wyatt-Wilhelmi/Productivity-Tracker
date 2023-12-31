const mongoose = require('mongoose');
require('dotenv').config();

const ToDo = require('../../models/ToDo.js');

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

    const { newDatabaseItem } = JSON.parse(event.body);

    const newToDoList = new ToDo({text: newDatabaseItem.text, day: newDatabaseItem.day, user_id: newDatabaseItem.userID});
    await newToDoList.save();


      return {
        statusCode: 200,
        body: JSON.stringify({ id: newToDoList._id })
      };

  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
}