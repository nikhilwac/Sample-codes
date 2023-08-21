const mongoose = require('mongoose');
const {mySchema} = require('./schemaDefinition')

module.exports.MyModel = mongoose.model('Spider-man',mySchema);