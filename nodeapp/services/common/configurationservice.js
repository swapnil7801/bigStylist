var uuid = require('node-uuid');
var contextPath = process.cwd();
//var config = require(contextPath + '/nodeapp/config.js');
var logger = require(contextPath + '/nodeapp/utils/logger.js');
var configuration = require(contextPath + '/nodeapp/models/common/configuration.js');

module.exports = {
	getConfigValues:function(req,callback){
		var result = {
			"status": '',
			"msg": ''
		}
		logger.debug('Start: configurationService getConfigValues');
		var publicId = uuid.v1();
		var inputdata = req.body;
		logger.debug('inputdata =' + JSON.stringify(inputdata, null, 4));
		if (!inputdata.env_ip) {
			result.status = 400;
			result.msg = 'env_ip is required';
		}
		if(!inputdata.env_port){
			result.status = 400;
			result.msg = 'env_port is required.'
		}
		configuration.methods.getConfigValues(req.body, function(err,output) {
			if (output) {
				result.status = '200';
				result.msg = 'configurations successfully retrieved ';
				result.configRecords = output;
				callback(null, result);
			} else if(err){
				result.status = 500;
				result.msg = err;
				callback(err, result);
			}
		});
	}, //end of getConfigValues
    create : function(req,callback){
    var result = {
		"status": '',
		"msg": ''
	}
	logger.debug('Start: configurationService create');	
	var inputdata = req.body;
	logger.debug('inputdata =' + JSON.stringify(inputdata, null, 4));
	if(!inputdata){
		result.status = 400;
		result.msg = 'input data is required.';
	}
	configuration.methods.create(req.body,function(err,output){
    	if (output) {
				result.status = '200';
				result.msg = 'configurations successfully created ';
				result.configRecord = output;
				callback(null, result);
		} else if(err){
			result.status = 500;
			result.msg = err;
			callback(err, result);
		}
	});
    }, // end of create
    update : function(req,callback){
    	var result = {
			"status": '',
			"msg": ''
		}
		logger.debug('Start: configurationService update');	
		var inputdata = req.body;
		var id = req.param('id');
		logger.debug('inputdata =' + JSON.stringify(inputdata, null, 4));
		logger.debug('id ='+id);
		if(!inputdata){
			result.status = 400;
			result.msg = 'input data is required.';
		}
		if(!id){
			result.status = 400;
			result.msg = 'input id is required.';
		}
		configuration.methods.update(id,req.body,function(err,output){
	    	if (output) {
				result.status = '200';
				result.msg = 'configurations successfully updated.';
				result.configRecord = output;
				callback(null, result);
			} else {
				result.status = 500;
				result.msg = err;
				callback(err, result);
			}
		});
    }, //end of update
    getById : function(req,callback){
    	var result = {
			"status": '',
			"msg": ''
		}
		logger.debug('Start: configurationService getById');	
		var id = req.param('id');
		logger.debug('id ='+id);
		if(!id){
			result.status = 400;
			result.msg = 'input id is required.';
		}
		configuration.methods.getById(id,function(err,output){
	    	if (output) {
				result.status = '200';
				result.msg = 'configurations successfully updated.';
				result.configRecord = output;
				callback(null, result);
			} else if(err){
				result.status = 500;
				result.msg = err;
				callback(err, result);
			}
		});
    }, // end of getById
    delete : function(req,callback){
    	var result = {
			"status": '',
			"msg": ''
		}
		logger.debug('Start: configurationService delete');	
		var id = req.param('id');
		logger.debug('id ='+id);
		if(!id){
			result.status = 400;
			result.msg = 'input id is required.';
		}
		configuration.methods.delete(id,function(err,output){
			if (output) {
				result.status = '200';
				result.msg = 'configurations successfully deleted.';				
				callback(null, result);
			} else if(err){
				result.status = 500;
				result.msg = err;
				callback(err, result);
			}
		});	
    }
}