const mongoose = require('mongoose');
const { MyModel } = require('./modelDefinition');
const dotenv = require('dotenv'); // Import dotenv

// Load environment variables from .env file
dotenv.config();
const MONGO_URL = process.env.DB_CONNECTION_STRING;
mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected!'));

async function storeData(name, age, address) {
  let response
  const instance = new MyModel({
    _id: new mongoose.Types.ObjectId(23),
    name: name,
    age: age,
    address: address,
    dob: Date.now()
  });
  await instance.save()
    .then(savedInstance => {
      console.log("Saved instance:", savedInstance);
      response =  savedInstance
    })
    .catch(error => {
      console.error("Error saving instance:", error);
    });
  return response
  }


module.exports = storeData;



