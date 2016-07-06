/**
 * MainController  for BackEndFramework.
 * Created by swankhade on 23/10/15.
 */
var contextPath = process.cwd(); // This is the context path of the application.
var http = require('http');
var url = require('url');
var bcrypt = require('bcrypt-nodejs');
var logger = require(contextPath + '/nodeapp/utils/logger.js');
var userService = require(contextPath + '/nodeapp/services/common/userservice.js');
var requestUtil = require(contextPath + '/nodeapp/utils/requestutility.js');
var monitoringService = require(contextPath + '/nodeapp/services/monitor/monitoringservice.js');
var configService = require(contextPath + '/nodeapp/services/common/configurationservice.js');
var jwt = require('jsonwebtoken'); //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var passport = require('passport');
var secret = 'this is the secret secret secret 12356';

/**
 * Function to Authenticate the Request 
 * @param  {Object}   request Object      
 * @param  {[type]}   response Object     
 * @param  {Function} callback Function
 * @return {void}   
 */
function authenticate(req, res, callback) {
    var authResult = "";
    //callback(authResult);
    logger.debug('Inside mainCtrl:authenticate');

    var header = req.headers['authorization'] || '', // get the header
        token = header.split(/\s+/).pop() || '', // and the encoded auth token
        auth = new Buffer(token, 'base64').toString(), // convert from base64
        parts = auth.split(/:/), // split on colon
        appname = parts[0],
        password = parts[1];
    logger.debug('header = ' + header);
    logger.debug('appname =' + appname + '***');
    logger.debug('password =' + password + '***');
    if (!appname || !password) {
        var err = {
            "status": '201',
            "msg": 'Authentication : Error while obtaining record with appname From config '
        };
        logger.debug(' authentication for appname password undefined');
        callback(err, authResult);
    } else {
        //This is just for testing, spitting out hashvalue
        var bcryptPass = bcrypt.hashSync(password);
        //Querying usertable on appname
        var hashFromConfig = config[appname];
        logger.info("DBValue" + hashFromConfig);
        logger.info(config);
        if (hashFromConfig) {
            logger.debug('hashFromConfig=' + hashFromConfig);
            bcrypt.compare(password, hashFromConfig, function(err, res) {
                logger.debug(" BYCRYPT response===>" + res);
                if (res) {
                    authResult = 'success';
                    logger.info('Authentication successful for appname ' + appname);
                } else {
                    logger.info('appname or password does not match for app ' + appname);
                } //end of else
                logger.debug('Returning authentication for user ' + JSON.stringify(err));
                callback(err, authResult);
            }); //end of bcrypt            
        } else {
            logger.debug('in else 2');
            logger.error('Authentication : Error while obtaining record with appname From config ');
            var err = {
                "status": '201',
                "msg": 'Authentication : Error while obtaining record with appname From config '
            };
            callback(err, authResult);
        } //end of else
    } //end of else        
} //end of authenticate

/**
 * Sends the given error or data back to response.
 * @param  {Error}      err             - is the error object.
 * @param  {Object}     data            - result data.
 * @param  {Response}   response        - response object to send the result to.
 */
function sendToResponse(err, data, response) {
    if (err) {
        if (err.statusCode) {
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
    addUserProfile: function(req, res) {
        authenticate(req, res, function(err, authResult) {
            if (err) {
                logger.error('Authentication fails, can not proceed with addUserProfile ' + JSON.stringify(err));
                res.send(err);
            } else {
                logger.debug('Start: mainCtrl addUserProfile');
                var userInput = req.body;
                logger.info("userInput--->" + req.body);
                var email = req.body.email;
                logger.info("email--->" + email);
                if (!userInput) {
                    res.send('Error! Can not register User without userInput, please resend');
                }
                if (!email) {
                    res.send('Error! Can not register User without email, please resend');
                }
                userService.register(req, function(err, result) {
                    logger.debug('addUserProfile, In mainCtrl result =' + JSON.stringify(result, null, 4));
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    }, ///end of addUserProfile  

    updateUserProfile: function(req, res) {
        authenticate(req, res, function(err, authResult) {
            if (err) {
                logger.error('Authentication fails, can not proceed with updateUserProfile ' + JSON.stringify(err));
                res.send(err);
            } else {
                logger.debug('Start: mainCtrl updateUserProfile');
                var userInput = req.body.userData;
                var userid = req.body.userid;
                if (!userInput) {
                    res.send('Error! Can not update User without userInput, please resend');
                }
                if (!userid) {
                    res.send('Error! Can not update User without userid, please resend');
                }
                userService.updateUser(userid, userInput, function(err, result) {
                    logger.debug('updateUserProfile, In mainCtrl result =' + JSON.stringify(result, null, 4));
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    }, ///end of addUserProfile  
    getUserProfileById: function(req, res) {
        authenticate(req, res, function(err, authResult) {
            if (err) {
                logger.error('Authentication fails, can not proceed with getUserProfileById ' + JSON.stringify(err));
                res.send(err);
            } else {
                logger.debug('Start: mainCtrl updateUserProfile');
                var userid = req.param('userid');
                logger.debug('userid =' + userid);
                if (!userid) {
                    res.send('Error! Can not send  User Data without userid, please resend');
                }
                userService.getUserProfileById(userid, function(err, result) {
                    logger.debug('getUserProfileById, In mainCtrl result =' + JSON.stringify(result, null, 4));
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    },

    getVMStats: function(req, res) {
        var command = 'node -v';
        monitoringService.executeCommand(command, function(err, data) {
            sendToResponse(err, data, res);
        });
    },

    login: function(req, res, next) {
        console.log("Api call");
        //var userName = req.body.userName;
        //var password = req.body.password;

        /*if (userName === 'test@test.com' && password === 'test123') {
            var loginServiceObj = {
                LoginStatus: true,
                msg: 'valid user',
                id: 1222
            };
        } else {
            var loginServiceObj = {
                LoginStatus: false,
                msg: 'invalid user'
            };
        }

        res.json(loginServiceObj);*/
        passport.authenticate('local', function(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.sendStatus(400);
            }


            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                var profile = {
                    "role": user.role,
                    "username": user.email,
                    "userId": user._id
                };
                // We are sending the profile inside the token
                var token = jwt.sign(profile, secret, {
                    expiresIn: 60 * 5
                });
                res.json({
                    token: token,
                    user: user,
                    creationTime: new Date()
                });
                //if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                //res.json(200, { "LoginStatus": true, "msg": "valid user" });
                //res.status(200).json({"LoginStatus": true, "msg": "valid user", "id":user._id});
            });
        })(req, res, next);
    },

    getConfigValues: function(req, res, next) {
        authenticate(req, res, function(err, authResult) {
            if (err) {
                logger.error('Authentication fails, can not proceed with getConfigValues ' + JSON.stringify(err));
                res.send(err);
            } else {
                logger.debug('Start: mainCtrl getConfigValues');
                var env_ip = req.body['env_ip'];
                var env_port = req.body['env_port'];
                logger.debug('env_ip =' + env_ip);
                logger.debug('env_port =' + env_port);
                if (!env_port) {
                    res.send('Error! Can not send  configuration Data without env_port, please resend');
                }
                if (!env_ip) {
                    res.send('Error! Can not send  configuration Data without env_ip, please resend');
                }
                configService.getConfigValues(req, function(err, result) {
                    logger.debug('getConfigValues, In mainCtrl result =' + JSON.stringify(result, null, 4));
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    }, // end of getConfigValues
    createConfig: function(req, res, next) {
        /*authenticate(req, res, function(err, authResult) {
            if (err) {*/
        logger.error('Authentication fails, can not proceed with createConfig ' + JSON.stringify(err));
        res.send(err);
        /*} else { */
        logger.debug('Start: mainCtrl createConfig');
        var configInput = req.body;
        if (!configInput) {
            res.send('Error! Can not create  configuration Data without configInputinput, please resend');
        }
        configService.create(req, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
        /*}  
        });*/
    }, //end of createConfig
    updateConfig: function(req, res, next) {
        authenticate(req, res, function(err, authResult) {
            if (err) {
                logger.error('Authentication fails, can not proceed with updateConfig ' + JSON.stringify(err));
                res.send(err);
            } else {
                logger.debug('Start: mainCtrl updateConfig');
                var configInput = req.body;
                var id = req.param('id');
                if (!configInput) {
                    res.send('Error! Can not create  configuration Data without configInputinput, please resend');
                }
                if (!id) {
                    res.send('Error! Can not update configuration Data without id, please resend');
                }
                configService.update(req, function(err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    }, //end of updateConfig
    getConfigById: function(req, res, next) {
        authenticate(req, res, function(err, authResult) {
            if (err) {
                logger.error('Authentication fails, can not proceed with getConfigById ' + JSON.stringify(err));
                res.send(err);
            } else {
                logger.debug('Start: mainCtrl getConfigById');
                var id = req.param('id');
                logger.debug('id = ' + id);
                if (!id) {
                    res.send('Error! Can not get configuration Data without id, please resend');
                }
                configService.getById(req, function(err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    }, // end of getConfigById
    deleteConfig: function(req, res, next) {
            authenticate(req, res, function(err, authResult) {
                if (err) {
                    logger.error('Authentication fails, can not proceed with deleteConfig ' + JSON.stringify(err));
                    res.send(err);
                } else {
                    logger.debug('Start: mainCtrl deleteConfig');
                    var id = req.param('id');
                    logger.debug('id = ' + id);
                    if (!id) {
                        res.send('Error! Can not get configuration Data without id, please resend');
                    }
                    configService.delete(req, function(err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send(result);
                        }
                    });
                }
            });
        } // end of deleteConfig
}