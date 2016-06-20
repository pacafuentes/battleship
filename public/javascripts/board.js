(function() {
  angular.module('app', ['ngDragDrop', 'ui.bootstrap'])
    .controller('boardCtrl', function($scope, $q) {
      $scope.beforeDrop = function (e) {
        var tablePosition = document.getElementById("myBoard").getBoundingClientRect();
        var minX = tablePosition.left + 37;
        var topLeftShipXPosition = e.toElement.getBoundingClientRect().left;

        var defer = $q.defer();
        if(topLeftShipXPosition < minX) defer.reject();
        else defer.resolve();

        return defer.promise;
      }  
    });
  
    // .directive('board', [function () {
    //   return {
    //     restrict: 'E',
    //     scope: {
    //       id : '@'
    //     },
    //     link: function($scope) {
    //
    //     },
    //     template: ''
    //   }
    // }])

  var createTable = function () {
    var tableSize = 10;

    var tBody = document.getElementById("myBoard").childNodes[0].childNodes[0];
    var headTr = document.createElement("TR");
    headTr.appendChild(document.createElement("TH"));

    for(var i = 0; i < tableSize; i++) {
      var th = document.createElement("TH");
      th.textContent = i;
      headTr.appendChild(th);
    }
    tBody.appendChild(headTr);

    for(var i = 0; i < tableSize; i++) {
      var tr = document.createElement("TR");
      var letterTd = document.createElement("TD");
      letterTd.textContent = String.fromCharCode(i + 65);
      tr.appendChild(letterTd);
      for(var j = 0; j < tableSize; j++) {
        var td = document.createElement("TD");
        td.id = String.fromCharCode(i + 65) + String(j);
        td.setAttribute('data-drop', 'true');
        td.setAttribute('jqyoui-droppable', "{beforeDrop: 'beforeDrop'}");
        td.setAttributeNode(document.createAttribute('data-jqyoui-options'));
        tr.appendChild(td);
      }
      tBody.appendChild(tr);
    }
  };

  createTable();


}).call(this);