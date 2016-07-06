/**
 * Created by swankhade on 26/10/15.
 * Model: Configuration
 */

var mongoose = require('mongoose'),
    contextPath = process.cwd(), // This is the context path of the application.
    logger = require(contextPath + '/nodeapp/utils/logger.js'),
    Schema = mongoose.Schema;

var configSchema = mongoose.Schema({
    env_ip: String,
    env_port: String,
    key: String,
    value: String,
    type: String
});

var Configuration = mongoose.model('configuration', configSchema);
module.exports = Configuration;
var methods = {
    /**
     * create the configuration key value pair in the Databse to access it through the Config Global Env variable
     * @param  {Object}   configInput Key value pair of the Configuration to be added
     * @param  {Function} callback  Function
     * @return {void}              
     */
    create: function(configInput, callback) {
        logger.info('Start: User create');
        logger.info('configInput =' + JSON.stringify(configInput));
        var result = "";
        var configData = configInput;
        Configuration.create(configData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while adding recored to Configuration:' + err);
                callback(err, result);
            } else {
                logger.debug('New record added succesfully:' + JSON.stringify(data));
                result = data;
                callback(err, result);
            }
        })
    },
    /**
     * update function changes the Configuration value
     * @param  {String}   id          Id of the Configuration Object
     * @param  {Object}   configInput configInput Key value pair of the Configuration to be Changed
     * @param  {Function} callback   Function
     * @return {void}               
     */
    update: function(id, configInput, callback) {
        logger.info('Start: Configuration create');
        logger.info('Input id =' + id);
        logger.info('configInput =' + JSON.stringify(configInput));
        var result = "";
        var configData = configInput;
        Configuration.findByIdAndUpdate(id, configData, function(err, data) {
            if (err) {
                logger.error('err =' + err);
                logger.error('Error while updating recored to Configuration:' + err);
                callback(err, result);
            } else {
                logger.debug('Record updated succesfully:' + JSON.stringify(data));
                result = data;
                callback(err, result);
            }
        });
    },
    /**
     * getById retrieves the value based on the Id of the Configuration
     * @param  {String}   id       Id of the Config
     * @param  {Function} callback Function
     * @return {void}            
     */
    getById: function(id, callback) {
        logger.info('Start: Configuration getById');
        logger.info('Input id =' + id);
        var result = "";
        if (!id || id.trim() === '') {
            console.log('Invalid or no input id');
            var err = "Invalid or no input id";
            callback(err, result);
        }
        Configuration.findOne({
            _id: id
        }).exec(function(err, ConfigurationRecord) {
            if (err) {
                console.log('Error while obtaining record Configuration with ID=' + id + ' ' + err);
                callback(err, result);
            } else {
                console.log('Result:' + JSON.stringify(ConfigurationRecord));
                result = ConfigurationRecord;
                callback(err, result);
            }
        });
    },
    /**
     * Function to Delete the Config value from the DB
     * @param  {String}   id       Id of the Config
     * @param  {Function} callback Function
     * @return {void}            
     */
    delete: function(id, callback) {
        logger.info("Start Configuration delete");
        logger.info('Input id =' + id);
        var result = "";
        Configuration.findByIdAndRemove(id, function(err) {
            if (err) {
                console.log('Error while deleting record Configuration with id =' + id + ' ' + err);
                callback(err, null);
            } else {                
                callback(err, result);
            }
        });
    },
    /**
     * Function to retrieve all the  Config values for Specific env_ip and env_port
     * @param  {Object}   input    Key value Object of  env_ip and env_port
     * @param  {Function} callback Function
     * @return {void}            
     */
    getConfigValues: function(input, callback) {
        logger.info('Start: getConfigValues ');
        logger.info('Input  =',input);
        var result = "";
        if (!input.env_ip || input.env_ip.trim() === '') {
            console.log('Invalid or no env_ip ');
            var err = 'Invalid or no input env_ip';
            callback(err, result);
        }
        if (!input.env_port || input.env_port.trim() === '') {
            console.log('Invalid or no env_port ');
            var err = 'Invalid or no input env_port';
            callback(err, result);
        }
        Configuration.find({
            env_port: input.env_port,
            env_ip: input.env_ip
        }).exec(function(err, configRecords) {
            if (err) {
                console.log('Error while obtaining record  with env_port =' + input.env_port + ' ' + input.env_ip + ' ' + err);
                callback(err, null);
            } else {
                console.log('Result:' + JSON.stringify(configRecords));
                result = configRecords;
                callback(err, result);
            }
        });
    }
}

module.exports.methods = methods;