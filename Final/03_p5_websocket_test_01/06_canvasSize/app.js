var express	= require('express');
var app = express();
var PORT = 8000;

// Routing
app.use('/', express.static(__dirname + '/public'));

// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Server listening at port ' + PORT);
});

/*-------------- SOCKET.IO --------------*/
// Everything will be inside the on() function
// .on() listens to any string you create ('umi-entered', 'soomi-arrived',...)
// or two predefined events: 'connection' and 'disconnect'


var _height = 100000;
var _players = [1];

io.on('connection', function(socket) {
    // .on(identifier, callback(data))      listens to
    // .emit(identifier, data)              sends data to every user
    // .broadcast.emit(identifier, data)    sends data to every user, except the newly created

    console.log('A new user has connected: ' + socket.id);
    
    socket.on('player',
      function(player) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'player' from" + socket.id);
      /*  for (var i = 0; i < _players.length; i++) {
        player = _players[i];
        }*/
        if (player.height < _height){
            _height = player.height;
            console.log('New height: ' + _height);
            socket.broadcast.emit('sizeHeight', _height);

        } else{
            socket.emit('sizeHeight', _height);
        }

        console.log(' Left side: ', player.side);



      }
    );

    // A listener for socket disconnection
    socket.on('movement',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'movement' " + data.x);
        
        // Send it to all other clients
        io.sockets.emit('movement', data.x);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
});