var Messages = require('../models/MessagesModel.js');
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

