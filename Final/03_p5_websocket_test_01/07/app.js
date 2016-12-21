var express	= require('express');
var app = express();
var PORT = 8888;

// Routing
app.use('/', express.static(__dirname + '/public'));

// Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(PORT, function(){
    console.log('Server listening at port ' + PORT);
});

/*-------------- SOCKET.IO --------------*/

//Setting a super large height so it is always larger than the device that connects, just to make sure function further down runs correctly.
var _height = 100000;
//Creating an array to put the players in.
var _player = ["", ""];
//Start total x position outside screen.
var _x = -80;
//Creating booleans for triggering the screen change
var trigger = false;
var stop = false;

io.on('connection', function(socket) {

    console.log('A new user has connected: ' + socket.id);
    
    socket.on('player',
      function(player) {
        
        console.log("Received: 'player' from" + socket.id);

       /* for (var i = 0; i < _players.length; i++) {
        player = _players[i];
        }*/

        //If the players device height is smaller than the total height, use the height of the
        //smaller device for the height of the canvas. Otherwise objects will be "jumping" up and down if
        //above/below a smaller devices height.
        if (player.height < _height){
            _height = player.height;
            console.log('New height: ' + _height);
            //Send this only to the other devices, as the one sending wont need to change any settings.
            socket.broadcast.emit('sizeHeight', _height);

        } else{
            //But if the sending device is larger than any device already connected, return the info of
            //the smaller device already connected, so the new(sending) device can change the settings
            //of it's canvas to fit that.
            socket.emit('sizeHeight', _height);
        }

        //Put the player into the array depending on if its the left or right side. So we know which device
        //to pull what info from.
        if (player.side == true){
            _player[0] = player;
        } else {
            _player[1] = player;
        }
        console.log(' Left side: ', player.side);

      }
    );

   
    socket.on('movement',
      function(data) {
        
        console.log('Data x: ' + data.x + 'Data w: ' + data.localWidth + 'Data side' + data.side);
        //If the circle reaches the end of the screen of the left device, trigger the circle to swap to the right device.
        if (data.side == true && data.x >= data.localWidth){
            console.log('triggers on');
            //set the trigger true and send to right device
            trigger = true;
            socket.broadcast.emit('trigger', trigger);
            //set it to false and send back to the left device
            trigger = false;
            socket.emit('trigger', trigger);
            
        }
        
        io.sockets.emit('movement', data.x);

      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
});