var socket = io()

//접속했을때 실행
socket.on('connect', function() {
    var input = document.getElementById('test')
    input.value = '접속 됨'
})

//전송함수
function send() {
    //입력된 데이터 가져오기
    var message = document.getElementById('test').value
    //빈칸으로 변경
    document.getElementById('test').value = ''
    //서버로 data와 send 이벤트 전달
    socket.emit('send', {msg:message})
}
