
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
  
  socket.on('newUser', function(name) {
    console.log(name + ' 님이 접속하였습니다.')

    //소켓이름 저장
    socket.name = name
    //다른 소켓에게 전송
    io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})
  })

  socket.on('message', function(data) {
    //받은 데이터를 누가 보냈는지 이름 추가
    data.name = socket.name

    console.log(data)
    //보낸사람을 제외한 다른 유저에게 전송
    socket.broadcast.emit('update', data);
  })

  //접속종료
  socket.on('disconnect', function() {
    console.log(socket.name + '님이 나갔습니다.')

    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'})
  })
})

server.listen(8080, function() {
  console.log('서버 실행 .. ')
})
