const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/idle", {
    keepAlive         : true,
    useNewUrlParser   : true,
    useUnifiedTopology: true,
    useCreateIndex    : true
})

module.exports.User = require('./user');
module.exports.Group = require('./group');
module.exports.Message = require('./message');