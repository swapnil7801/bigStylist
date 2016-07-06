/**
 * Created by swankhade on 26/10/15.
 * Model: Admin
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/nodeapp/utils/logger.js'),
    Schema = mongoose.Schema;

var adminSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    activationstatus: Boolean,
    createdon:{type:Date ,default: Date.now}
});
var methods = {
    create: function(adminInput, callback) {
        logger.info('Start: Admin create');
        logger.info('adminInput =' + JSON.stringify(adminInput));
        var result = "";
        var adminData = adminInput;
        Admin.create(adminData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to Admin:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data;
                callback(err, result);
            }
        })
    },
    update: function(id, adminInput, callback) {
        logger.info('Start: Admin update');
        logger.info('Input id =' + id);
        logger.info('adminInput =' + JSON.stringify(adminInput));
        var result = "";
        var adminData = adminInput;
        Admin.findByIdAndUpdate(id, adminData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to Admin:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: Admin getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id === '') {
            console.log('Invalid or no input id');            
        }
        Admin.findOne({
            _id: id
        }).exec(function(err, adminRecord) {
            if (err) {
                console.log('Error while obtaining record Admin with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(adminRecord));
                result = adminRecord;
                callback(err, result);
            }
        });
    },
    getByEmail: function(email, callback) {
        logger.info('Start: Admin getByEmail');
        logger.info('Input email =' + email);
        var result = "";
        if (!email || email.trim() === '') {
            console.log('Invalid or no input email');
            callback(err, result);
        }
        Admin.findOne({
            email: email
        }).exec(function(err, adminRecord) {
            if (err) {
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(adminRecord));
                result = adminRecord;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start Admin delete");
        logger.info('Input id =' + id);
        var result = "";
        Admin.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record Admin with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Admin record deleted succesfully.');
                callback(err, result);
            }
        });
    },
    validPassword : function(user,pwd){
        logger.info('Start User validPassword');
        logger.info('Input pwd = '+pwd);
        return (user.password === pwd);
    }
}
var Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
module.exports.methods = methods;