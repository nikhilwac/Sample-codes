const MyModel = require('./schemaDefinition')

async function getInfo(name) {
    let data
    await MyModel.findByName(name).then(results => {
        data = results
    })

    await MyModel.find().byName(name).exec((err, datda) => {
        console.log('query method', datda);
    });

    return data
}

module.exports = getInfo