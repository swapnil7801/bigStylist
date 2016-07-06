/**
 * Created by swankhade on 28/10/15.
 * Model: ActivityLogger
 */
var mongoose = require('mongoose'),
    contextPath = process.cwd(), // This is the context path of the application.
    logger = require(contextPath + '/nodeapp/utils/logger.js'),
    Schema = mongoose.Schema;
var activityLoggerSchema = mongoose.Schema({
    //id:  {type:ObjectIdSchema, default: function () { return new ObjectId()} },
    name: {
        type: String
    },
    actor: {
        type: String
    },
    origin: String,
    note: String,
    entityname: String,
    entityid: String,
    starttime: Date,
    endtime: Date,
    inputpayload: Schema.Types.Mixed,
    outputpayload: Schema.Types.Mixed,
});
var activityLoggerSchema = mongoose.Schema({
    //id:  {type:ObjectIdSchema, default: function () { return new ObjectId()} },
    name: {
        type: String
    },
    actor: {
        type: String
    },
    origin: String,
    note: String,
    entityname: String,
    entityid: String,
    starttime: Date,
    endtime: Date,
    inputpayload: Schema.Types.Mixed,
    outputpayload: Schema.Types.Mixed,
});
var ActivityLogging = mongoose.model('activitylogging', activityLoggerSchema);

var methods = {
    /**
     * createActivityLog creates the activity log for the given activity 
     * @param  {Object}   activityloggingInput Object
     * @param  {Function} callback function
     * @return {void}                        
     */
    createActivityLog: function(activityloggingInput, callback) {
        logger.info('Start: Activitylogger create');
        logger.info('activityloggingInput =' + JSON.stringify(activityloggingInput));
        var result = "";
        var activityLoggerData = activityloggingInput;
        activityLoggerData.created_at = new Date();
        ActivityLogging.create(activityLoggerData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to ActivityLogging:' + err);
                result = '';
                callback(err, result);
            } else {
                result = data;
                callback(err, result);
            }
        })
    },
    /**
     * getById retrieves the ActivityLog by the given Id
     * @param  {String}   id       id of the Activity Log
     * @param  {Function} callback function
     * @return {void}           
     */
    getById: function(id, callback) {
        logger.info('Start: ActivityLogging getById');
        logger.info('Input id =' + id);
        var result = "";
        if (!id) {
            logger.debug('Invalid or no input id');
            var err = 'Invalid or no input id';
            callback(err, result);
        }
        ActivityLogging.findOne({
            _id: id
        }).exec(function(err, activityLogRecord) {
            if (err) {
                logger.error('Error while obtaining record activitylog with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                logger.debug('Result:' + JSON.stringify(activityLogRecord));
                result = activityLogRecord;
                callback(err, result);
            }
        });
    },
    /**
     * getByEntityid retrieves the ActivityLog by the given Entityid 
     * @param  {[type]}   entityid id of the entity
     * @param  {Function} callback function
     * @return {[type]}           
     */
    getByEntityid: function(entityid, callback) {
        logger.info('Start: ActivityLogging getByEventId');
        logger.info('Input entityid =' + entityid);
        var result = "";
        if (!entityid || entityid.trim() === '') {
            logger.debug('Invalid or no input entityid');
            var error = 'Invalid or no input entityid';
            callback(err, result);
        }
        ActivityLogging.findOne({
            entityid: entityid
        }).exec(function(err, activityLogRecord) {
            if (err) {
                logger.error('Error while obtaining record ActivityLogging with entityid=' + entityid + ' ' + err);
                callback(err, result);
            } else {
                logger.debug('Result:' + JSON.stringify(activityLogRecord));
                result = activityLogRecord;
                callback(err, result);
            }
        });
    },
   /**
    * getActivities  retrieves the  ActivityLogs by the given activityName,actor,origin
    * @param  {String}   activityName value of the activityname
    * @param  {String}   actor        value of the actor
    * @param  {String}   origin       value of the origin
    * @param  {Function} callback     callback function
    * @return {void}                
    */
    getActivities: function(activityName, actor, origin, callback) {
        logger.info('Start: ActivityLogger getActivities');
        logger.info('Input activityname =' + activityName);
        logger.info('Input actor =' + actor);
        logger.info('Input origin =' + origin);
        var result = "";
        ActivityLogging.find({
            name: activityName,
            actor: actor,
            origin: origin
        }).exec(function(err, activityLogRecord) {
            if (err) {
                logger.error('Error while executing getActivities with Name=' + activityName + ' ' + err);
                callback(err, result);
            } else {
                result = activityLogRecord;
                callback(err, result);
            }
        });
    }

}

module.exports = ActivityLogging;
module.exports.methods = methods;