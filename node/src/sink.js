// Task sink in node.js
// Binds PULL socket to tcp://localhost:5558
// Collects results from workers via that socket.

var zmq  = require('zmq')
  , receiver = zmq.socket('pull');

function start_receiver() {

  receiver.on('message', function (data) {
    console.log(data.toString());
  });

  receiver.bindSync("tcp://*:5558");

}

start_receiver()