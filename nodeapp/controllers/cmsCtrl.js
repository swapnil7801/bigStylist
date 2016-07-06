/**
 * MainController  for BackEndFramework.
 * Created by swankhade on 23/10/15.
 */
var fs=require('fs');
var contextPath = process.cwd(); // This is the context path of the application.
var http = require('http');
var url = require('url');
var bcrypt = require('bcrypt-nodejs');
var logger = require(contextPath + '/nodeapp/utils/logger.js');
var userService = require(contextPath + '/nodeapp/services/common/userservice.js');
var requestUtil = require(contextPath + '/nodeapp/utils/requestutility.js');
var monitoringService = require(contextPath + '/nodeapp/services/monitor/monitoringservice.js');
var configService = require(contextPath + '/nodeapp/services/common/configurationservice.js');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var passport =  require('passport');
var secret = 'this is the secret secret secret 12356';




/**
 * Sends the given error or data back to response.
 * @param  {Error}      err             - is the error object.
 * @param  {Object}     data            - result data.
 * @param  {Response}   response        - response object to send the result to.
 */
function sendToResponse(err, data, response) {
    if(err) {
        if(err.statusCode) {
            response.status(err.statusCode);
        }
        response.status(500).json(err);
    } else {
        response.status(200).json(data);
    }
}

module.exports = {

    /**
     * Function to call the UserService's Register Function
     * @param {req} request Object 
     * @param {res} response Object
     */
    getDashboard: function(req,res) {
      var data;
     // logger.error("SESSION DATA-- ",req.session);
     data=req.session;
     // logger.error("SESSION email-- ",JSON.stringify(data.session));
     data=JSON.stringify(data);
     logger.error("SESSION type-- ",typeof(data));
     // data.passport=data.passport;
     fs.writeFileSync("data.txt",JSON.stringify(data)); 
     logger.info("session" ,data);
     // logger.info("data---",   data.passport);
     res.render('cms/layout/sidebar',{data:data});
          // res.render(contextPath+'/nodeapp/views/cms/layout/sidebar.html');
    }, ///end of addUserProfile  
    gethome: function(req, res) {
          res.render('cms/layout/home');
    },
    signup: function(req, res) {
          res.render('cms/login/register');
    },
    login: function(req, res) {
          res.render('cms/login/login');
    },
    signupAdmin: function(req,res){
        

    }
}