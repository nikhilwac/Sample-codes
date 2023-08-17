const mongoose = require('mongoose');
const { MyModel } = require('./modelDefinition');
const dotenv = require('dotenv'); // Import dotenv

// Load environment variables from .env file
dotenv.config();
const MONGO_URL = process.env.DB_CONNECTION_STRING;
mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected!'));
  
// Create the model


// Create an instance of the model and save it
const instance = new MyModel({
  title: "Something",
  body: "Anything",
  date: Date.now()
});

instance.save()
  .then(savedInstance => {
    console.log("Saved instance:", savedInstance);
  })
  .catch(error => {
    console.error("Error saving instance:", error);
  });