/**
 * Created by swankhade on 26/10/15.
 * Model: category
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/nodeapp/utils/logger.js'),
    Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
    name: String,
    storeid:{type: Schema.ObjectId, ref: 'store'},
    image: String,
    description: String,
    activationstatus: Boolean,
    createdon:{type:Date ,default: Date.now}
});
var methods = {
    create: function(catInput, callback) {
        logger.info('Start: Category create');
        logger.info('catInput =' + JSON.stringify(catInput));
        var result = "";
        var catData = catInput;
        Category.create(catData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to Category:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data;
                callback(err, result);
            }
        })
    },
    update: function(id, catInput, callback) {
        logger.info('Start: Category update');
        logger.info('Input id =' + id);
        logger.info('catInput =' + JSON.stringify(catInput));
        var result = "";
        var catData = catInput;
        Category.findByIdAndUpdate(id, catData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to Category:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: Cat getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id === '') {
            console.log('Invalid or no input id');            
        }
        Category.findOne({
            _id: id
        }).exec(function(err, catRecord) {
            if (err) {
                console.log('Error while obtaining record Category with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(catRecord));
                result = catRecord;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start Category delete");
        logger.info('Input id =' + id);
        var result = "";
        Category.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record Category with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Category record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Category = mongoose.model('category', categorySchema);
module.exports = Category;
module.exports.methods = methods;