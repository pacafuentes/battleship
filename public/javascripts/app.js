angular.module('app', ['ngDragDrop', 'ui.bootstrap'])
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
      if (shipLeft < minX || shipRight > maxX || shipTop < minY || shipBottom > maxY) defer.reject();
      else defer.resolve();

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
