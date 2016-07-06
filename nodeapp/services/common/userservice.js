/**
 * Created by swankhade on 23/10/15.
 * userservice
 */

var uuid = require('node-uuid');
var contextPath = process.cwd();
//var config = require(contextPath + '/nodeapp/config.js');
var logger = require(contextPath + '/nodeapp/utils/logger.js');
var user = require(contextPath + '/nodeapp/models/common/user.js');


module.exports = {
	/**
	 * Function to Register the User.
	 * @param  {Object}   req    Object
	 * @param  {Function} callback Function
	 * @return {void}           
	 */
	register: function(req, callback) {
		var result = {
			"status": '',
			"msg": ''
		}
		logger.debug('Start: userService register');
		var publicId = uuid.v1();
		var inputdata = req.body;
		// logger.info("inputdata-"+inputdata);
		logger.debug('inputdata user =' + JSON.stringify(inputdata, null, 4));
		if (!inputdata.email) {
			result.status = 400;
			result.msg = 'Email id is required';
		};
		inputdata.createdon = new Date();
		if(inputdata.password){
		inputdata.password =user.methods.createHash(inputdata.password);
     	}
		user.methods.getByEmail(inputdata.email, function(err, email_output) { ///check if email is already registered
			//logger.debug("email_output--" + JSON.stringify(email_output));
			if ((err) || (!email_output)) {
				user.methods.create(inputdata, function(err, newuser) {
					if (err) {
						callback(err, result);
					} else {
						result.status = '200';
						result.msg = 'User registered successfully';						
						result.obj = newuser;
						callback(err, result);
					}
				});
			} else {
				result.status = 200;
				result.msg = 'Email already registered';
				callback(err, result);
			}
		});
	}, //end of register
	login: function(req, callback) {
		var result = {
			"status": '',
			"msg": ''
		}
		logger.debug('Start: userService login');
		var publicId = uuid.v1();
		var inputdata = req.body;
		// logger.info("inputdata-"+inputdata);
		logger.debug('inputdata user =' + JSON.stringify(inputdata, null, 4));
		if ((!inputdata.email) ||(!inputdata.password)) {
			result.status = 400;
			result.msg = 'Email id is required';
		    callback(err, result);
		  };
		user.methods.getByEmail(inputdata.email, function(err, email_output) { ///check if email is already registered
			//logger.debug("email_output--" + JSON.stringify(email_output));
			if ((err) || (!email_output)) {
				result.status = 400;
				result.msg = 'user_not_registered';
				callback(err, result);
			} else {
				//match password
			 var db_password= email_output.password
			 var valid = user.methods.isValidPassword(inputdata.password,email_output.password)
			  if(valid){
			  	result.status = 200;
				result.msg = 'user_logged_in';
				result.user=email_output;
				callback(err, result);
			  }else{
	            result.status = 400;
				result.msg = 'invalid_user';
				result.user=email_output;
				callback(err, result);
			  }
			}
		});
	}, //end of register
	/**
	 * Function to update the User Data for specific User
	 * @param  {String}   userid   
	 * @param  {Object}   userData 
	 * @param  {Function} callback Function
	 * @return {void}          
	 */
	updateUser: function(userid, userData, callback) {
		var result = {
			"status": '',
			"msg": ''
		}
		logger.debug('Start: userService register');
		var inputdata = userData;
		var userid = userid;
		logger.debug('update user =' + JSON.stringify(inputdata, null, 4));
		user.methods.update(userid, inputdata, function(err, updateduser) {
			if (err) {
				result.status = 500;
				result.msg = err;
				callback(err, result);
			} else {
				result.status = 200;
				result.msg = 'User updated successfully';
				result.obj = updateduser;
				callback(err, result);
			}
		});
	}, //end of register
	/**
	 * Function to retrieve the User Profile
	 * @param  {String}   userid  
	 * @param  {Function} callback Function
	 * @return {void}            
	 */
	getUserProfileById: function(userid, callback) {
			var result = {
				"status": '',
				"msg": ''
			}
			logger.debug('Start: userService getUserProfileById');
			// var userid = userid;
			user.methods.getById(userid, function(err, output) {
				if (err) {
					result.status = 500;
					result.msg = err;
					callback(err, result);
				} else {
					result.status = 200;
					result.msg = 'User Data successfully retrieved ';
					result.userRecord = output;
					callback(err, result);
				}
			});
		}, //end of register
	getUserProfileByEmail: function(email, callback) {
			var result = {
				"status": '',
				"msg": ''
			}
			logger.debug('Start: userService getUserProfileById');
			// var email = email;
			user.methods.getByEmail(email, function(err, output) {
				if (err) {
					result.status = 500;
					result.msg = err;
					callback(err, result);
				} else {
					result.status = 200;
					result.msg = 'User Data successfully retrieved ';
					result.userRecord = output;
					callback(err, result);
				}
			});
		} //end of register
}