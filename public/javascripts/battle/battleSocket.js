var socket = io().connect('http://localhost:3000');

socket.on('msg', function (data) {
  document.getElementById('msg').innerText = data;
});

socket.on('hit enemy', function(data) {
  document.getElementById('msg').innerText = 'you hit an enemy boat! Its opponent turn';
  document.getElementById(data).className += ' hit';
});

socket.on('hit mine', function(data) {
  document.getElementById(data.split('@')[1]).className += ' hit';
  document.getElementById('msg').innerText = 'your enemy hit on ' + data.split('@')[1] + '! Its your turn';
});

socket.on('miss enemy', function(data) {
  document.getElementById('msg').innerText = 'you miss! Its opponent turn';
  document.getElementById(data).className += ' visited';
});

socket.on('miss mine', function(data) {
  document.getElementById(data.split('@')[1]).className += ' visited';
  document.getElementById('msg').innerText = 'your enemy missed in ' + data.split('@')[1] + '! Its your turn';
});

socket.on('sink enemy', function(data) {
  document.getElementById('msg').innerText = 'you sinked an enemies boat! Its your opponent turn';
  document.getElementById(data).className += ' hit';
});

socket.on('sink mine', function(data) {
  document.getElementById('msg').innerText = 'your enemy sinked a boat of yours! Its your turn';
});

socket.on('won enemy', function(data) {
  document.getElementById('msg').innerText = 'you won!';
  setTimeout(function(){
    window.location.href = '/home';
  }, 5000);
});

socket.on('won mine', function(data) {
  document.getElementById('msg').innerText = 'you lose';
  setTimeout(function(){
    window.location.href = '/home';
  }, 5000);
});