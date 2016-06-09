var io = require('../server.js').io


io.on('connection', function(socket){
  console.log('a user connected ____________________');
  socket.on('join', function(data){
  	socket.join(data.userId);
  	console.log('__________________________', data.userId)
  })

  socket.on('message', function(data) {
  	console.log('---------------------', data)
  	io.sockets.in(data.receiver).emit('sendingMessage', data);
  }); 

});

