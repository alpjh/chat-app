const express = require('express')

const socket = require('socket.io')

const http = require('http')

const app = express()

const server = http.createServer(app)

const io = socket(server)

app.get('/', function(request, response) {
  console.log('유저가 / 으로 접속!')
  response.send('Hello, Express Server!')
})

server.listen(8080, function() {
  console.log('서버 실행 .. ')
})
