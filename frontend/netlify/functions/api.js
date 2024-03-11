import serverless from "serverless-http";

import express, { Router } from "express";

var bodyParser = require('body-parser')

const api = express();
const router = Router();

api.use(bodyParser.json())

let scores = []

router.get('/scores', (req, res) => {
    res.send(scores)
})

router.post('/score', (req, res) => {
    scores.push(req.body)
    res.sendStatus(200);
})

api.use("/api/", router);

export const handler = serverless(api);