var express = require('express');
var compress = require('compression');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var user = require('./nodeapp/models/common/user.js');
var contextPath = process.cwd();
var expressSession = require('express-session');
var lusca = require('lusca');
var expressJwt = require('express-jwt');
var secret = 'this is the secret secret secret 12356';
var flash = require('connect-flash');

GLOBAL.config = {};
var configCtrl = require(contextPath + '/nodeapp/controllers/configCtrl.js');
var userService = require(contextPath + '/nodeapp/services/common/userservice.js');
configCtrl.addBaseProperties();

var app = express();
var serviceapp = module.exports = express();
serviceapp.use(compress());
serviceapp.use('/static', express.static(__dirname + '/public')); ///SHOULD BE AT THE BEGINING
serviceapp.use(bodyParser.json());
serviceapp.use(bodyParser.urlencoded({
    extended: true
}));
serviceapp.use(cookieParser());
///SESSION CODE
serviceapp.use(expressSession({
    secret: "suckItBitches"
}))
serviceapp.use(passport.initialize());
serviceapp.use(passport.session());
//CODE  FOR RENDERING HTML AND EJS VIEWS
serviceapp.set('views', __dirname + '/nodeapp/views');
serviceapp.engine('html', require('ejs').renderFile);
serviceapp.engine('ejs', require('ejs').renderFile);
serviceapp.set('view engine', 'html');
serviceapp.set('view engine', 'ejs');
serviceapp.use(flash());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,`PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
};

serviceapp.use(allowCrossDomain);


// serviceapp.use('/api', router);


serviceapp.use('/backend', function(req, res) {
    res.json({
        message: 'Backend is up and running....'
    });
});
//PASSPORT CODE

passport.use('signup', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function(req,username,password, done) {
        // check in mongo if a user with username exists or not 
        userService.register(req, function(err, result) {
            // logger.debug('addUserProfile, In server Js result =' + JSON.stringify(result, null, 4));
            // logger.debug('OBJ =' + result.obj);
            if (result.msg="Email already exists") {
                return done(null, false, req.flash('errorMessage', 'User Already Exists'));
            } else {
                return done(null, result.obj);
            }

        })
    }));

passport.use('login', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function(req,username,password, done) {
        // check in mongo if a user with username exists or not 
        userService.login(req, function(err, result) {
            // logger.debug('addUserProfile, In server Js result =' + JSON.stringify(result, null, 4));
            // logger.debug('OBJ =' + result.obj);
            if (result.status==200) {
                return done(null, result.user);
            } else {
                return done(null, false, req.flash('errorMessage', 'Invalid USers'));
            }

        })
    }));

//END OF PASSPORT

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/cms/login');
}


serviceapp.post('/cms/register', passport.authenticate('signup', {
    successRedirect: '/cms/dashboard/index',
    failureRedirect: '/cms/login',
    failureFlash: true
}));

serviceapp.post('/cms/login', passport.authenticate('login', {
    successRedirect: '/cms/dashboard/index',
    failureRedirect: '/cms/register',
    failureFlash: true
}));
serviceapp.get('/cms/logout', function(req, res) {
  req.logout();
  res.redirect('/cms/login');
});
require('./nodeapp/routes.js')(serviceapp);
require('./nodeapp/routes_cms.js')(serviceapp);
serviceapp.listen(config.node_app_port, config.node_app_ip, function() { //this config value should be same as in ENV
    configCtrl.refreshConfig(function(result) {
        // console.log(result);
        console.log("magic happens on port " + config.node_app_port + ' at IP ' + config.node_app_ip + " over " + config.node_app_use)
            // console.log('server running at port ' + config.node_app_port + ' and IP ' + config.node_app_ip 
            //     + ' over ' + GLOBAL.config.node_app_use);
    });
});