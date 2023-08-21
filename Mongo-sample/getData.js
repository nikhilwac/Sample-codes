const mongoose = require('mongoose');

async function getData() {
    try {
        const data = await mongoose.model('Spider-man').find({});
        return data;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}
module.exports = getData;