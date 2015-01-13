var socketio = require('socket.io');
exports.socketServer = function(server) {
    var io = socketio(server);

    io.sockets.on('connection', function(socket) {
      console.log('user connected')
    });

    this.updateList = function(){
      io.sockets.emit('updateList')
    }

    this.updatePost = function(postId){
      io.sockets.emit('updatePost', postId)
    }
};
