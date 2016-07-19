(function () {
  var tableSize = 10;
  var i;

  //my board
  var tBody = document.getElementById("myBoard").childNodes[0];
  var headTr = document.createElement("TR");
  //for first row
  headTr.appendChild(document.createElement("TH"));
  tBody.appendChild(headTr);

  for(i = 0; i < tableSize; i++) {
    //tHead
    var th = document.createElement("TH");
    th.textContent = i;
    headTr.appendChild(th);

    var tr = document.createElement("TR");
    var letterTd = document.createElement("TD");
    letterTd.textContent = String.fromCharCode(i + 65);
    tr.appendChild(letterTd);

    for(var j = 0; j < tableSize; j++) {
      var td = document.createElement("TD");
      td.id = String.fromCharCode(i + 65) + String(j);
      td.setAttribute('class', 'sea');
      td.setAttribute('data-drop', 'true');
      td.setAttribute('jqyoui-droppable', "{beforeDrop: 'beforeDrop'}");
      tr.appendChild(td);
    }
    tBody.appendChild(tr);
  }

  //enemy board
  tBody = document.getElementById("enemyBoard").childNodes[0];
  headTr = document.createElement("TR");
  //for first row
  headTr.appendChild(document.createElement("TH"));
  tBody.appendChild(headTr);

  for(i = 0; i < tableSize; i++) {
    //tHead
    var th = document.createElement("TH");
    th.textContent = i;
    headTr.appendChild(th);

    var tr = document.createElement("TR");
    var letterTd = document.createElement("TD");
    letterTd.textContent = String.fromCharCode(i + 65);
    tr.appendChild(letterTd);

    for(var j = 0; j < tableSize; j++) {
      var td = document.createElement("TD");
      td.id = '@' +String.fromCharCode(i + 65) + String(j);
      td.setAttribute('class', 'sea enemy');
      var clickFunction = function (e) {
        socket.emit('shot', e.srcElement.id);
        e.srcElement.removeEventListener('click', this)
      };
      td.addEventListener('click', clickFunction);
      tr.appendChild(td);
    }
    tBody.appendChild(tr);
  }

})();