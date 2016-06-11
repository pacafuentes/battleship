var mongoose = require('mongoose');
mongoose.connect('localhost:27017/battleship');
db = mongoose.connection;

db.on('error', function() {
  console.log('not connected!');
});

db.once('open', function() {
  console.log('connected!');
});

util = {
  mongoose: mongoose,
  schemas: {
    getSchema: function(model) {
      var newSchema;
      newSchema = mongoose.Schema(model.attributes);
      newSchema.methods = model.methods;
      return newSchema;
    },
    "class": function(name, model) {
      var newSchema;
      newSchema = mongoose.Schema(model.attributes);
      newSchema.methods = model.methods;
      return mongoose.model(name, newSchema);
    }
  }
};

module.exports = util;
