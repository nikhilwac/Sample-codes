const mongoose = require('mongoose');
const {mySchema} = require('./schemaDefinition')

module.exports.MyModel = mongoose.model("ModelName", mySchema);