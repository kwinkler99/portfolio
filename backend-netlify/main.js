const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.json())

let scores = []

app.get('/api/scores', (req, res) => {
    res.send(scores)
})

app.post('/api/score', (req, res) => {
    scores.push(req.body)
    res.sendStatus(200);
})



app.listen(port, () => {
    console.log(`Backend netlify server listening on port ${port}`)
})