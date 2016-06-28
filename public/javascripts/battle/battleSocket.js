var socket = io().connect('http://localhost:3000');

socket.on('msg', function (data) {
  document.getElementById('msg').innerText = data;
});

socket.on('hit enemy', function(data) {
  document.getElementById('msg').innerText = 'you hit an enemy boat! Its opponent turn';
});

socket.on('hit mine', function(data) {
  document.getElementById('msg').innerText = 'your enemy hit a boat of yours! Its your turn';
});

socket.on('miss enemy', function(data) {
  document.getElementById('msg').innerText = 'you miss! Its opponent turn';
});

socket.on('miss mine', function(data) {
  document.getElementById('msg').innerText = 'your enemy missed! Its your turn';
});

socket.on('sink enemy', function(data) {
  document.getElementById('msg').innerText = 'you sinked an enemies boat! Its your opponent turn';
});

socket.on('sink mine', function(data) {
  document.getElementById('msg').innerText = 'your enemy sinked a boat of yours! Its your turn';
});

socket.on('won enemy', function(data) {
  document.getElementById('msg').innerText = 'you won!';
  window.location.href = '/home'
});

socket.on('won mine', function(data) {
  document.getElementById('msg').innerText = 'you lose';
  window.location.href = '/home'
});