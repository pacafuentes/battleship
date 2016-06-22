angular.module('app', ['ngDragDrop', 'ui.bootstrap'])
  .controller('boardCtrl', function($scope, $q, $http) {

    $scope.beforeDrop = function (e) {

      var tablePosition = document.getElementById("myBoard").getBoundingClientRect();
      var minX = tablePosition.left + 37;
      var maxX = tablePosition.right;
      var minY = tablePosition.top + 50;
      var maxY = tablePosition.bottom;

      var shipLeft = e.toElement.getBoundingClientRect().left;
      var shipRight = e.toElement.getBoundingClientRect().right;
      var shipTop= e.toElement.getBoundingClientRect().top;
      var shipBottom = e.toElement.getBoundingClientRect().bottom;

      var defer = $q.defer();
      //check if ship is out of the board
      if (shipLeft < minX || shipRight > maxX || shipTop < minY || shipBottom > maxY) defer.reject();
      else {
        //if is in the board checks if the cell is not occupied by other ship
        var topLeftCell = document.elementsFromPoint(shipLeft + 25, shipTop + 25)[1];
        var botRightCell = document.elementsFromPoint(shipRight - 25, shipBottom - 25)[1];

        if (e.toElement.className.includes('rotated')) {
          var cellToCheck = ((shipBottom - shipTop) / 50) - 2;
          for(var i = 1; i <= cellToCheck; i++) {
            var middleCell = document.elementsFromPoint(shipLeft + 25, shipTop + (50 * i) + 25)[1];
            if (middleCell.tagName == "IMG") {
              defer.reject();
              return defer.promise;
            }
          }
        } else {
          var cellToCheck = ((shipRight - shipLeft) / 50) - 2;
          for(var i = 1; i <= cellToCheck; i++) {
            var middleCell = document.elementsFromPoint(shipLeft + (50 * i) + 25, shipTop + 25)[1];
            if (middleCell.tagName == "IMG") {
              defer.reject();
              return defer.promise;
            }
          }
        }

        if (topLeftCell.tagName == "IMG" || botRightCell.tagName == "IMG") {
          defer.reject();
          return defer.promise;
        }
        defer.resolve();
      }

      return defer.promise;
    };

    var ships = document.getElementsByClassName('ship');
    for (var i = 0; i < ships.length; i++) {
      ships[i].addEventListener('dblclick', function(e) {
        if (e.srcElement.style.top != 0 && e.srcElement.style.left != 0) {
          var className = e.srcElement.className;
          var style = e.srcElement.style;

          //when rotate change relative position so angular drag n drop can do his magic
          var start;
          if (className.indexOf("rotate") > -1) {
            e.srcElement.className = className.substring(0, className.indexOf("rotated") - 1);
            start = e.srcElement.src.indexOf('ship');
            e.srcElement.src = '/images/' + e.srcElement.src.substring(start, start + 5) + '.png';
          } else {
            e.srcElement.className = className + " rotated";
            start = e.srcElement.src.indexOf('ship');
            e.srcElement.src = '/images/' + e.srcElement.src.substring(start, start + 5) + '-rotated.png';
          }

          var tablePosition = document.getElementById("myBoard").getBoundingClientRect();
          var minX = tablePosition.left + 37;
          var maxX = tablePosition.right;
          var minY = tablePosition.top + 50;
          var maxY = tablePosition.bottom;

          var shipLeft = e.srcElement.getBoundingClientRect().left;
          var shipRight = e.srcElement.getBoundingClientRect().right;
          var shipTop = e.srcElement.getBoundingClientRect().top;
          var shipBottom = e.srcElement.getBoundingClientRect().bottom;

          var left = parseInt(style.left.substr(0, style.left.indexOf('p')));
          var top = parseInt(style.top.substr(0, style.top.indexOf('p')));

          if (shipLeft < minX) e.srcElement.style.left = String(left + minX - shipLeft) + 'px';
          if (shipRight > maxX) e.srcElement.style.left = String(left - (shipRight - maxX)) + 'px';
          if (shipTop < minY) e.srcElement.style.top = String(top + minY - shipTop) + 'px';
          if (shipBottom > maxY) e.srcElement.style.top = String(top - (shipBottom - maxY)) + 'px';
        }
      });
    }
    
    
    document.getElementById('readyBtn').addEventListener('click', function(e){
      var ships = document.getElementsByClassName('ship');

      for (var i = 0; i < ships.length; i++) {
        $('#' + ships[i].id).draggable( "option", "disabled", true );;
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

      // $http.post('/game/board', data).then(function(response) {
      //   console.log('Ok')
      // })

      socket.emit('addShips', {ships: data, user: 'paca'});
    });
  });
