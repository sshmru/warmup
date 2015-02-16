var socketio = require('socket.io');
exports.socketServer = function(server) {
  var io = socketio(server);

  io.sockets.on('connection', function(socket) {
    console.log('user connected')

    socket.on('subscribeTo', function(data) {
      console.log('soceket susrcibtion', data)
    })
  });


  this.updateList = function() {
    io.sockets.emit('updateList')
    console.log(io.rooms)
  }

  this.updatePost = function(postId) {
    io.sockets.emit('updatePost', postId)
  }

  //io.sockets.manager.rooms
  //io.sockets.manager.roomClients
  //io.sockets.in(room).emit('uiEvent', {})
  //socket.get('nickname', function(err, nickname) {});
  //socket.set('nickname', name);
};
