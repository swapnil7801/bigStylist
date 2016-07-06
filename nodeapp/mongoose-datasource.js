var mongoose = require('mongoose'),
	config = require('./config.js');
    // authModel = require('./models/Authentication'),
    // activityLogModel = require('./models/ActivityLogger');

var datasource = function(){
	console.log('Using mongoose datasource - ' + config.db_url);
    mongoose.connect('mongodb://' + config.db_url);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open',function callback(){
        console.log('BackeEndFramework  db opened');
    });
};

module.exports.datasource = datasource();

