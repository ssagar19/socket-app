// Make connection
var socket = io.connect('http://localhost:4000', {  reconnection: true,
reconnectionDelay: 1000,
reconnectionDelayMax : 5000,
reconnectionAttempts:5,
transports:['websocket'],
forceNew: true,

});

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});
// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('disconnect', function(data){
    console.log(data, ' has from client side');
alert('User has been disconnected');
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
socket.on('reconnect', function(data){
    console.log(data + ' - reconnect');
});
