/**
 * configCtrl  for BackEndFramework.
 * Created by swankhade on 23/10/15.
 */
var contextPath = process.cwd();
var mongoose = require('mongoose');
var logger = require(contextPath + '/nodeapp/utils/logger.js');
var fs = require('fs');
var appconfig = require(contextPath + "/nodeapp/app_config.js");
var util = require('util');
var configuration = require(contextPath + '/nodeapp/models/common/configuration');
var node_app_ip = appconfig.node_app_ip;
var node_app_port = appconfig.node_app_port;
var node_app_use = appconfig.node_app_use;



module.exports = {
    /**
     * Function to connect to the MongoDB Database 
     * @return {[void} 
     */
         datasource: function() {
            console.log('Using mongoose datasource - ' + appconfig.db_url);
            mongoose.connect('mongodb://' + appconfig.db_url);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error...'));
            db.once('open', function callback() {
                console.log('DB  connection opened');
            });
        },
        /**
         * Function to add the Base Config values in the Env that are used to start the Server
         */
        addBaseProperties: function() {
            // console.log('*********** process.env =' + JSON.stringify(process.env));
            module.exports.datasource();
            logger.debug('Adding base properties in GLOBAL.config');
            GLOBAL.config.node_app_ip   = node_app_ip;
            GLOBAL.config.node_app_port = node_app_port;
            GLOBAL.config.node_app_use  = node_app_use;
        }, //end of addBaseProperties
        /**
         * Function to Add or Update the Config Values into the Config Namespace for the Specific Port and Ip 
         * @param  {Function} callback Function
         * @return {void}           
         */
        refreshConfig: function(callback) {
            module.exports.getByEnvironmentIpAndPort(function(err, result) {
                if (err) {
                    callback(err, '*************** config Unsuccessful **************');
                } else {
                    module.exports.addBaseProperties();
                    logger.debug('result.configexport =' + JSON.stringify(result));
                    logger.debug('***************');
                    logger.debug('GLOBAL.config 1 =' + util.inspect(GLOBAL.config));
                    GLOBAL.config = {};
                    logger.debug('***************');
                    logger.debug('GLOBAL.config 2 =' + util.inspect(GLOBAL.config));
                    GLOBAL.config = result;
                    logger.debug('***************');
                    logger.debug('GLOBAL.config 3 =' + util.inspect(GLOBAL.config));
                    callback(err, '*************** config Refresh successful **************');
                }
            });
        }, //end of refreshConfig
        /**
         * Function to retrieve the Config values for specific IP and Port
         * @param  {Function} callbackvFunction
         * @return {void}             
         */
        getByEnvironmentIpAndPort: function(callbacktop) {
            logger.debug('Start: configuration getByEnvironmentIpAndPort');
            logger.debug('Input EnvironmentIp ='+node_app_ip);
            logger.debug('Input EnvironmentPort ='+node_app_port);
            var input = {
                'env_ip': node_app_ip,
                'env_port': node_app_port
            };
            var result = "";
            configuration.methods.getConfigValues(input, function(err, output) {
                if (err) {
                    console.log("err"+JSON.stringify(err));
                    callbacktop(err, result);
                } else {
                    result = computeJSON(output);
                    console.log(result);
                    callbacktop(err, result);
                }
            });
        }, //end of getByEnvironmentIpAndPort    

    } //end of module.export

/**
 * Function to Process the Config value from the Database and convert them to Single Json Object
 * @param  {Object} configurationRecords 
 * @return {Object}  single Json Object
 */
function computeJSON(configurationRecords) {
    //logger.debug('Computing module.exports length='+configurationRecords.length);
    var key_arr = [];
    var value_arr = [];
    for (var index = 0; index < configurationRecords.length; index++) {
        if (configurationRecords[index].type == 'single') {
            var key = (configurationRecords[index].key).trim();
            var value = (configurationRecords[index].value).trim();
        } else {
            var key = (configurationRecords[index].key).trim();
            var parsed_object = JSON.parse(configurationRecords[index].value);
            var value = parsed_object;
            //console.log("PSC DB COnF Object ---"+ JSON.stringify(parsed_object));
            //fs.writeFileSync('/home/swankhade/PMC/Barney_3.0.1/pscdb_config.txt',JSON.stringify(parsed_object,null,3));

        }
        //console.log('key: ' + key + ' Value: '+value);

        key_arr.push(key);
        value_arr.push(value);
    };

    var modExp = toObject(key_arr, value_arr);
    return modExp;
} //enf of computeJSON

//Function to create Object
/**
 * Function used to convert the value and key in to the Object
 * @param  {String} names  
 * @param  {String} values 
 * @return {Object}   Javascript Object
 */
function toObject(names, values) {
    var result = {};
    for (var i = 0; i < names.length; i++)
        result[names[i]] = values[i];
    return result;
}