var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var zmq = require('zmq');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var sender = zmq.socket('push');
sender.bindSync("tcp://*:5557");

var receiver = zmq.socket('pull');
receiver.bindSync("tcp://*:5558");

io.on('connection', function(socket){
  socket.on('get_commits_history', function(msg){
    console.log('message: ' + msg);
    console.log("Sending tasks to workers…");
    sender.send(JSON.stringify(msg));
  });

  receiver.on('message', function (data) {
    console.log(data.toString());

    socket.emit('commits_history_result', JSON.parse(data.toString()))
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});