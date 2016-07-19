var socket = io(document.domain + ':3000' + '/game');

socket.on('msg', function (data) {
  console.log(data);
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

var readyFunction = function(e){
  var ships = document.getElementsByClassName('ship');

  for (var i = 0; i < ships.length; i++) {
    $('#' + ships[i].id).draggable( "option", "disabled", true );
  }

  var ship1 = document.getElementById('ship1');
  var ship2 = document.getElementById('ship2');
  var ship3 = document.getElementById('ship3');
  var ship4 = document.getElementById('ship4');
  var ship5 = document.getElementById('ship5');
  var ship6 = document.getElementById('ship6');

  var ship1Position = {
    front: document.elementsFromPoint(ship1.getBoundingClientRect().left + 25, ship1.getBoundingClientRect().top + 25)[1].id,
    end: document.elementsFromPoint(ship1.getBoundingClientRect().right - 25, ship1.getBoundingClientRect().bottom - 25)[1].id
  };

  var ship2Position = {
    front: document.elementsFromPoint(ship2.getBoundingClientRect().left + 25, ship2.getBoundingClientRect().top + 25)[1].id,
    end: document.elementsFromPoint(ship2.getBoundingClientRect().right - 25, ship2.getBoundingClientRect().bottom - 25)[1].id
  };

  var ship3Position = {
    front: document.elementsFromPoint(ship3.getBoundingClientRect().left + 25, ship3.getBoundingClientRect().top + 25)[1].id,
    end: document.elementsFromPoint(ship3.getBoundingClientRect().right - 25, ship3.getBoundingClientRect().bottom - 25)[1].id
  };

  var ship4Position = {
    front: document.elementsFromPoint(ship4.getBoundingClientRect().left + 25, ship4.getBoundingClientRect().top + 25)[1].id,
    end: document.elementsFromPoint(ship4.getBoundingClientRect().right - 25, ship4.getBoundingClientRect().bottom - 25)[1].id
  };

  var ship5Position = {
    front: document.elementsFromPoint(ship5.getBoundingClientRect().left + 25, ship5.getBoundingClientRect().top + 25)[1].id,
    end: document.elementsFromPoint(ship5.getBoundingClientRect().right - 25, ship5.getBoundingClientRect().bottom - 25)[1].id
  };

  var ship6Position = {
    front: document.elementsFromPoint(ship6.getBoundingClientRect().left + 25, ship6.getBoundingClientRect().top + 25)[1].id,
    end: document.elementsFromPoint(ship6.getBoundingClientRect().right - 25, ship6.getBoundingClientRect().bottom - 25)[1].id
  };

  var data = [ship1Position, ship2Position, ship3Position, ship4Position, ship5Position, ship6Position];

  socket.emit('addShips', {ships: data, userId: getCookie('userId'), gameId: getCookie('gameId')});

  e.srcElement.removeEventListener('click', readyFunction);
};
