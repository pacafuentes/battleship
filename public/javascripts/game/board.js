angular.module('board', ['ngDragDrop', 'ui.bootstrap'])
  .controller('boardCtrl', function($scope, $q) {

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
  });

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length);
    }
  }
  return "";
}