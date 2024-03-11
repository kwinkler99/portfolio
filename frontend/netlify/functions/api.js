import serverless from "serverless-http";

const express = require('express')
var bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

let scores = []

app.get('/scores', (req, res) => {
    res.send(scores)
})

app.post('/score', (req, res) => {
    scores.push(req.body)
    res.sendStatus(200);
})

api.use("/api/", router);

export const handler = serverless(api);
