var WebSocket = require('ws');

module.exports = {
  ws: function (req, res) {
    var ws = new WebSocket('ws://www.localhost:3000');

    ws.on('open', function open() {
      ws.send('something');
    });

    ws.on('message', function(data, flags) {
      // flags.binary will be set if a binary data is received.
      // flags.masked will be set if the data was masked.
    });

    res.render('index', { title: 'Express' });
  }
};
