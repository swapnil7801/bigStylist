/**
 * Created by kvaidya on 28/10/15.
 * monitoringservice
 */

var uuid = require('node-uuid');
var contextPath = process.cwd();
//var config = require(contextPath + '/nodeapp/config.js');
var logger = require(contextPath + '/nodeapp/utils/logger.js');
var user = require(contextPath + '/nodeapp/models/common/user.js');

var exec = require('child_process').exec;


module.exports = {

	executeCommand: function(input, callback) {

		logger.info('Inside monitoringservice.executeCommand');
		logger.debug('Input => ' + JSON.stringify(input));

		var result = {
			'msg': '',
			'status': 'success'
		};

		var version =  exec('node --version', {async:true});
		version.stdout.on('data', function(data) {
			result.version = data;
			callback(null, result);
		});


	}
};