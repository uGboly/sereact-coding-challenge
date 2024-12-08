const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 4001 })

let counter = 0
let radius = 1

wss.on('connection', ws => {
  console.log('Client connected')

  ws.on('message', message => {
    const request = JSON.parse(message)
    const { method, params, id } = request

    let response

    if (method === 'increment') {
      counter += 1
      response = { id, result: counter }
    } else if (method === 'decrement') {
      counter -= 1
      response = { id, result: counter }
    } else if (method === 'getCounter') {
      response = { id, result: counter }
    } else if (method === 'set_radius') {
      radius = params.radius
      response = { id, result: 'Radius set successfully' }
    } else if (method === 'get_radius') {
      response = { id, result: radius }
    } else {
      response = { id, error: 'Method not supported' }
    }

    ws.send(JSON.stringify(response))
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log('WebSocket server is running on ws://localhost:4001')
