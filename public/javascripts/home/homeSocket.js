var connectSocket = function () {
  var socket = io();

  socket.on('waiting opponent', function () {
    //show loading bar
    console.log('waiting opponent')
  });

  socket.on('battle', function () {
    window.location.href = '/game'
  });
};