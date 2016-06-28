var connectSocket = function () {
  document.getElementById('playButton').removeEventListener('click', connectSocket);
  var socket = io();

  socket.on('waiting opponent', function () {
    //show loading bar
    document.getElementById('msg').innerText = 'searching an opponent to play'
  });

  socket.on('battle', function () {
    window.location.href = '/game'
  });
};