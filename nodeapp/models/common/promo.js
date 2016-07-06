/**
 * Created by swankhade on 26/10/15.
 * Model: promo
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(); // This is the context path of the application.
// mongooseds = require(contextPath + '/nodeapp/mongoose-datasource.js'),
logger = require(contextPath + '/nodeapp/utils/logger.js'),
    Schema = mongoose.Schema;

var promoSchema = mongoose.Schema({
    name: String,
    image: String,
    storeid:{type: Schema.ObjectId, ref: 'store'},
    description: String,
    promocode:String,
    type: { type:String,default:"flat"},
    promovalue: String,
    expirationdate: Date,
    activationstatus: Boolean,
    createdon:{type:Date ,default: Date.now}
});
var methods = {
    create: function(promoInput, callback) {
        logger.info('Start: Promo create');
        logger.info('promoInput =' + JSON.stringify(promoInput));
        var result = "";
        var promoData = promoInput;
        Promo.create(promoData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to Promo:' + err);
                result = '';
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data;
                callback(err, result);
            }
        })
    },
    update: function(id, promoInput, callback) {
        logger.info('Start: Promo update');
        logger.info('Input id =' + id);
        logger.info('promoInput =' + JSON.stringify(promoInput));
        var result = "";
        var promoData = promoInput;
        Promo.findByIdAndUpdate(id, promoData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to Pormo:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data
                callback(err, result);
            }
        });
    },

    getById: function(id, callback) {
        logger.info('Start: promo getById');
        logger.info('Input id =' + id);
        var result = ""
        if (!id || id === '') {
            console.log('Invalid or no input id');            
        }
        Promo.findOne({
            _id: id
        }).exec(function(err, promoRecord) {
            if (err) {
                console.log('Error while obtaining record Promo with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(promoRecord));
                result = promoRecord;
                callback(err, result);
            }
        });
    },
    delete: function(id, callback) {
        logger.info("Start Promo delete");
        logger.info('Input id =' + id);
        var result = "";
        Promo.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record Promo with id =' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Promo record deleted succesfully.');
                callback(err, result);
            }
        });
    }
}
var Promo = mongoose.model('promo', promoSchema);
module.exports = Promo;
module.exports.methods = methods;