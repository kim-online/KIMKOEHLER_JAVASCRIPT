var socket = io();
socket.on('connect', function() {
    document.getElementById("socketio").innerHTML = "socket connected";
});