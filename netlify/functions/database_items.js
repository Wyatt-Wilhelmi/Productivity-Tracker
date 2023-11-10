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
    const { userID } = JSON.parse(event.body);

    let inputUserID = userID;

    const newToDoList = await ToDo.find({ user_id: inputUserID }, 'text day completed -_id').sort({day: 1});

      return {
        statusCode: 200,
        body: JSON.stringify({toDoList: newToDoList})
      };

  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
}
