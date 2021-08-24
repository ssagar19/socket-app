var express = require("express");
var socket = require("socket.io");

// App setup
var app = express();
var server = app.listen(4000, function () {
  console.log("listening for requests on port 4000,");
});
var c = 1;
// Static files
app.use(express.static("public"));

// Socket setup & pass server
var io = socket(server);
io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on('connect_error', function(){
    console.log('Connection Failed');
});
  socket.on("disconnect", (reason) => {
    console.log(reason);
    io.sockets.emit("disconnect", socket.id);
  });

  // Handle chat event
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });


  socket.on('reconnect', function(data){
      console.log(data + ' - reconnect');
  });
  socket.on('reconnect_attempt', function(data){
      console.log(data + ' - reconnect_attempt');
  });
  socket.on('reconnecting', function(data){
      console.log(data + ' - reconnecting');
  });
  socket.on('reconnect_error', function(data){
      console.log(data + ' - reconnect_error');
  });
  socket.on('reconnect_failed', function(data){
      console.log(data + ' - reconnect_failed');
  });

  // Handle typing event
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
