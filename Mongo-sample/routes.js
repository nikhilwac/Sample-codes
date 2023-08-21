const express = require('express')
const app = express()
const storeData = require('./index')
const getData = require('./getData')
const getInfo = require('./getinfo')
app.use(express.json())

let port = 3000
app.post('/insert', async function (req, res) {
    let data = req.body
    console.log(data);
    await storeData(data.name, data.age,data.address)
    res.send(data)
})

app.get('/aggregation', async (req, res) => {
    let value = req.query.name
    let data = await getInfo(value)
    res.send(data)
})

app.get('/', async (req, res) => {
    let data = await getData()
    res.send(data)
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})