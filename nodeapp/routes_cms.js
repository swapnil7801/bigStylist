
var _ =           require('underscore')
    , path =      require('path')    
    , cmsCtrl = require('./controllers/cmsCtrl.js')

var routes = [  
 
    {
        path:'/cms/dashboard/index',
        httpMethod: 'GET',
        middleware: [cmsCtrl.getDashboard]
    },
    {
        path:'/cms/register',
        httpMethod: 'GET',
        middleware: [cmsCtrl.signup]
    },
    {
        path:'/cms/login',
        httpMethod: 'GET',
        middleware: [cmsCtrl.login]
    }
];

module.exports = function(app) {
    _.each(routes, function(route) {
        var args = _.flatten([route.path, route.middleware]);
        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT': 
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}

/*var router = require('express').Router();

var cmsCtrl = require('./controllers/cmsCtrl.js');

router.get('/cms/dashboard/index', cmsCtrl.getDashboard);


module.exports = router;*/