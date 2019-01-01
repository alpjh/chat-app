
const express = require('express')

const socket = require('socket.io')

const http = require('http')

const fs = require('fs')

const app = express()

const server = http.createServer(app)

const io = socket(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', function(request, response) {
  fs.readFile('./static/index.html', function(err, data) {
    if(err){
      response.send('error!!!!!')
    } else {
      response.writeHead(200,  {'Content-Type':'text/html'})
      response.write(data)
      response.end()
    }

  })
})

io.sockets.on('connection', function(socket) {
  console.log('유저 접속 됨')
  socket.on('send', function(data) {
    console.log ('전달된 메시지:', data.msg)
  })
  socket.on('disconnect', function() {
    console.log('접속 종료')
  })
})

server.listen(8080, function() {
  console.log('서버 실행 .. ')
})
