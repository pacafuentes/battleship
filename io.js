module.exports =  {
  handler : function (socket) {
    console.log("User connected");
    socket.emit('news', {hello: 'world'});

    socket.on('my other event', function (from, msg) {
      console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('turn', function (from, msg) {
      console.log(msg);
    });
  }
};