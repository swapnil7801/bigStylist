/**
 * Created by swankhade on 26/10/15.
 * Model: promo
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/nodeapp/utils/logger.js'),
    Schema = mongoose.Schema;

var orderSchema = mongoose.Schema({
    storeid:{type: Schema.ObjectId, ref: 'store'},
    itempurchased:[{type: Schema.ObjectId, ref: 'item'}],
    orderstatus:{type:String,enum:['pending','approved','rejected','completed']},
    totalprice:Number,
    promo:{type: Schema.ObjectId, ref: 'promo'},
    createdon:{type:Date ,default: Date.now}
});
var methods = {
    create: function(orderInput, callback) {
        logger.info('Start: Order create');
        logger.info('orderInput =' + JSON.stringify(orderInput));
        var result = "";
        var orderData = orderInput;
        Order.create(promoData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to Order:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data;
                callback(err, result);
            }
        })
    },
    update: function(id, orderInput, callback) {
        logger.info('Start: Order update');
        logger.info('Input id =' + id);
        logger.info('orderInput =' + JSON.stringify(orderInput));
        var result = "";
        var orderData = orderInput;
        Order.findByIdAndUpdate(id, orderData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to Order:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: order getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id === '') {
            console.log('Invalid or no input id');            
        }
        Order.findOne({
            _id: id
        }).exec(function(err, orderData) {
            if (err) {
                console.log('Error while obtaining record Order with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(orderData));
                result = orderData;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start Order delete");
        logger.info('Input id =' + id);
        var result = "";
        Order.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record Order with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Order record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Order = mongoose.model('order', orderSchema);
module.exports = Order;
module.exports.methods = methods;