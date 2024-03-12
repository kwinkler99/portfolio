const faunadb = require("faunadb")

const q = faunadb.query
const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context) => {
  let resp

  if (event.httpMethod === 'GET') {
    resp = await getScores()
  } else if (event.httpMethod === 'POST') {
    resp = await postScore()
  } else {
    resp = { statusCode: 500, body: 'Request not supported' }
  }

  return { statusCode: resp.statusCode, body: resp.body }

  async function getScores(){
    try {
      const req = await faunaClient.query(q.Map(
        q.Paginate(q.Documents(q.Collection("scores"))),
        q.Lambda("X", q.Get(q.Var("X")))
      ))
      return { statusCode: 200, body: JSON.stringify(req.data?.map(document => document.data)) }
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message}) }
    }
  }

  async function postScore(){
    try {
      const score = {
        data: JSON.parse(event.body)
      }

      const req = await faunaClient.query(q.Create(q.Ref("classes/scores"), score))
      console.log(req)

      return { statusCode: 200, body: JSON.stringify({ newMem: req }) }

    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message}) }
    }
  }

}