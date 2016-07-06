/**
 * Created by swankhade on 26/10/15.
 * Model: Store
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/nodeapp/utils/logger.js'),
    Schema = mongoose.Schema;

var storeSchema = mongoose.Schema({
    name: String,
    image:String,
    description:String,
    activationstatus: Boolean,
    createdon:{type:Date ,default: Date.now}
});
var methods = {
    create: function(storeInput, callback) {
        logger.info('Start: Store create');
        logger.info('storeInput =' + JSON.stringify(storeInput));
        var result = "";
        var storeData = storeInput;
        Store.create(storeData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to Store:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data;
                callback(err, result);
            }
        })
    },
    update: function(id, storeInput, callback) {
        logger.info('Start: Store update');
        logger.info('Input id =' + id);
        logger.info('storeInput =' + JSON.stringify(storeInput));
        var result = "";
        var storeData = storeInput;
        Store.findByIdAndUpdate(id, storeData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to Store:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: Store getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id === '') {
            console.log('Invalid or no input id');            
        }
        Store.findOne({
            _id: id
        }).exec(function(err, adminRecord) {
            if (err) {
                console.log('Error while obtaining record Store with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(storeRecord));
                result = storeRecord;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start Store delete");
        logger.info('Input id =' + id);
        var result = "";
        Store.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record Store with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Store record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Store = mongoose.model('store', storeSchema);
module.exports = Store;
module.exports.methods = methods;