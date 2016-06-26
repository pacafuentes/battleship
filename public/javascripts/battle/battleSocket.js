var socket = io().connect('http://localhost:3000');

socket.on('hit', function(data) {
  console.log(data);
});

socket.on('shipAdded', function (data) {

});

socket.on('msg', function (data) {
  document.getElementById('msg').innerText = data;
});
