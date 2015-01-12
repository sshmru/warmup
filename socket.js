var socketio = require('socket.io');
exports.socketServer = function(server) {
    var io = socketio(server);

    io.sockets.on('connection', function(socket) {
      console.log('user connected')
    });

    this.newPost = function(){
      io.sockets.emit('newPost')
    }
};
