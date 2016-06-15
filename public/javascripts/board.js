(function() {
  angular.module('app', [])
    .directive('board', [function () {
      return {
        restrict: 'E',
        scope: {
          id : '@'
        },
        link: function($scope) {
          var createTable = function () {
            var tableSize = 10;

            var tBody = document.getElementById($scope.id).childNodes[0].childNodes[0];
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
                tr.appendChild(td);
              }
              tBody.appendChild(tr);
            }
          };

          createTable()
        },
        template: '<table>' +
            '<tbody class="table-body">' +
            '</tbody>' +
          '</table>'
      }
    }]);

  var draggableElems = document.querySelectorAll('.draggable');
  var draggies = [];
  for ( var i=0, len = draggableElems.length; i < len; i++ ) {
    var draggableElem = draggableElems[i];
    var draggie = new Draggabilly(draggableElem, { containment: '.board' });
    draggie.on('dragEnd', function (event, pointer) {
      console.log('x: ' + pointer.pageX + ' - y: ' + pointer.pageY);
      console.log(document.elementsFromPoint(pointer.pageX - window.pageXOffset, pointer.pageY - window.pageYOffset)[1]);
    });

    draggie.on('staticClick', function (event, pointer) {
      var className = event.srcElement.className;
      event.srcElement.className = className.indexOf("rotate") > -1 ? className.substring(0, className.indexOf("rotate")) : className + " rotate";
    })
  }

}).call(this);