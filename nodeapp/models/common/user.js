/**
 * Created by swankhade on 26/10/15.
 * Model: User
 */

var mongoose = require('mongoose'),
    bCrypt =require('bcrypt-nodejs')
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/nodeapp/utils/logger.js'),
    Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    address:String,
    city:String,
    dob: Date,
    mobileno1: Number,
    mobileno2: Number,
    registrationdate: Date,
    lastlogindate: Date,
    logincount: Number,
    fbid: String,
    googleid: String,
    activationstatus: Boolean,
    usertype: {type:String,required:true,enum:['user','massager']},
    createdon:{type:Date ,default: Date.now}
});
var methods = {
    create: function(userInput, callback) {
        logger.info('Start: User create');
        logger.info('userInput =' + JSON.stringify(userInput));
        var result = "";
        var userData = userInput;
        if(!userData.usertype){
          userData.usertype='user'; 
        }
        User.create(userData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to User:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data;
                callback(err, result);
            }
        })
    },
    update: function(id, userInput, callback) {
        logger.info('Start: User create');
        logger.info('Input id =' + id);
        logger.info('userInput =' + JSON.stringify(userInput));
        var result = "";
        var userData = userInput;
        User.findByIdAndUpdate(id, userData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to User:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: User getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id === '') {
            console.log('Invalid or no input id');            
        }
        User.findOne({
            _id: id
        }).exec(function(err, userRecord) {
            if (err) {
                console.log('Error while obtaining record user with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(userRecord));
                result = userRecord;
                callback(err, result);
            }
        });
    },
    getByEmail: function(email, callback) {
        logger.info('Start: User getByEmail');
        logger.info('Input email =' + email);
        var result = "";
        if (!email || email.trim() === '') {
            console.log('Invalid or no input email');
            callback(err, result);
        }
        User.findOne({
            email: email
        }).exec(function(err, userRecord) {
            if (err) {
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(userRecord));
                result = userRecord;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start User delete");
        logger.info('Input id =' + id);
        var result = "";
        User.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record user with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('User record deleted succesfully.');
                callback(err, result);
            }
        });
    },
   isValidPassword: function(userpassword, dbpassword){
  return bCrypt.compareSync(userpassword, dbpassword);
   },
    createHash : function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
}
var User = mongoose.model('user', userSchema);
module.exports = User;
module.exports.methods = methods;