var connectSocket = function () {
  var socket = io().connect('http://localhost:3000');

  socket.on('waiting opponent', function () {
    //show loading bar
    console.log('waiting opponent')
  });

  socket.on('battle', function () {
    window.location.href = '/game'

  });
};