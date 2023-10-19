const express = require('express');
const mongoose = require('mongoose');

// const {MongoClient} = require("mongodb")
require('dotenv').config();
const uri = process.env.URI
// const client = new MongoClient(uri);
// const dbname = "prodTracker"

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to the Database successfully');
})
.catch(err => {
  console.error('Error connecting to the database: ', err);
});

// Start the server
const port = 3000; // or any other available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
