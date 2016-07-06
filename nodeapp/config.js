/**
 * Configuration file for BackEndFramework.
 * Created by swapnilwankhade on 05/05/15.
 */


var contextPath = process.cwd(); // This is the context path of the application.
var db_host = 'localhost'; //Database Host
var db_port = '27017'; //Database port
var db_name = 'BackEndFramework'; //Database name
var db_user = "";
var db_password = "";
var connectionString = "localhost:27017/BackEndFramework"; //Database connection URL
var node_app_ip = '127.0.0.1';
var node_app_port = '8000';
var support_files_path = contextPath+'/nodeapp/support_files';
var node_app_dns = 'localhost:8000';


if (process.env.OPENSHIFT_APP_DNS) {
    node_app_dns = process.env.OPENSHIFT_APP_DNS;
}

if (process.env.USER) {
    support_files_path = '/var/lib/openshift/' + process.env.USER + '/app-root/runtime/repo/nodeapp/support_files';
}

if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
    db_host = process.env.OPENSHIFT_MONGODB_DB_HOST;
}

if (process.env.OPENSHIFT_MONGODB_DB_PORT) {
    db_port = process.env.OPENSHIFT_MONGODB_DB_PORT;
}

if (process.env.OPENSHIFT_APP_NAME) {
    db_name = process.env.OPENSHIFT_APP_NAME;
}

if (process.env.OPENSHIFT_NODEJS_IP) {
    node_app_ip = process.env.OPENSHIFT_NODEJS_IP;
}

if (process.env.OPENSHIFT_NODEJS_PORT) {
    node_app_port = process.env.OPENSHIFT_NODEJS_PORT;
}

if (process.env.OPENSHIFT_MONGODB_DB_USERNAME) {
    db_user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
}

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    db_password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
}

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT;
}


if (process.env.OPENSHIFT_MONGODB_DB_USERNAME) {
    zip_config.mongo.auth = {};
    zip_config.mongo.auth.name = db_user;
    zip_config.mongo.auth.pass = db_password;
}

module.exports = {
    "db_host": db_host,
    "db_port": parseInt(db_port),
    "db_name": db_name,
    "node_app_ip": node_app_ip,
    "node_app_port": node_app_port,
    "db_user": db_user,
    "db_password": db_password,
    "db_url": connectionString,
    "support_files_path": support_files_path,
    "node_app_dns": node_app_dns

};