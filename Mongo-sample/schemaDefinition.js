const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
  address: String,
  dob: Date

});

mySchema.methods.getInfo = function () {
  return `Name: ${this.name}, Age: ${this.age}, Address: ${this.address}, Date of Birth: ${this.dob}`;
};
mySchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};

mySchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i') });
};
module.exports = mongoose.model('Spider-man', mySchema);