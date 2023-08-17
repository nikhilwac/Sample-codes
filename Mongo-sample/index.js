const mongoose = require('mongoose');
const { MyModel } = require('./modelDefinition');

mongoose.connect('mongodb+srv://nikhil:mdbpass123@cluster0.60gaknu.mongodb.net/')
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