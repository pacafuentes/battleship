var connectSocket = function () {
  document.getElementById('playButton').removeEventListener('click', connectSocket);
  var socket = io(document.domain + ':3000' + '/home');

  socket.on('waiting opponent', function () {
    //show loading bar
    document.getElementById('msg').innerText = 'searching an opponent to play'
  });

  socket.on('battle', function (gameId) {
    window.location.href = '/game/' + gameId;
  });
};