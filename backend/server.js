const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
let counter = 0

app.use(bodyParser.json())
app.use(cors({ origin: true, credentials: true }))

app.post('/json-rpc', (req, res) => {
  const { method } = req.body
  if (method === 'increment') {
    counter += 1
    res.json({ result: counter })
  } else if (method === 'decrement') {
    counter -= 1
    res.json({ result: counter })
  } else if (method === 'getCounter') {
    res.json({ result: counter })
  } else {
    res.status(400).json({ error: 'Method not supported' })
  }
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
