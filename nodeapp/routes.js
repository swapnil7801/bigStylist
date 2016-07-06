
var _ =           require('underscore')
    , path =      require('path')    
    , mainCtrl = require('./controllers/mainCtrl.js')

var routes = [  
   {
        path: '/api/resources/user',
        httpMethod: 'POST',
        middleware: [mainCtrl.addUserProfile]
    },
   {
        path: '/api/resources/user',
        httpMethod: 'PUT',
        middleware: [mainCtrl.updateUserProfile]
    },
    {
        path: '/api/resources/user',
        httpMethod: 'GET',
        middleware: [mainCtrl.getUserProfileById]
    },
    {
        path: '/api/resources/vmstats',
        httpMethod: 'GET',
        middleware: [mainCtrl.getVMStats]
    },
    {
        path: '/api/login',
        httpMethod: 'POST',
        middleware: [mainCtrl.login]
    },
    {
        path:'/api/config',
        httpMethod: 'POST',
        middleware: [mainCtrl.getConfigValues]
    },
    {
        path:'/api/resources/config',
        httpMethod: 'POST',
        middleware: [mainCtrl.createConfig]
    },
    {
        path:'/api/resources/config',
        httpMethod: 'PUT',
        middleware: [mainCtrl.updateConfig]
    },
    {
        path:'/api/resources/config',
        httpMethod: 'GET',
        middleware: [mainCtrl.getConfigById]
    },
    {
        path:'/api/resources/config',
        httpMethod: 'DELETE',
        middleware: [mainCtrl.deleteConfig]
    },
];

module.exports = function(app) {
    _.each(routes, function(route) {
        var args = _.flatten([route.path, route.middleware]);
        //console.log('args ='+args);
        //console.log('route.path ='+route.path);
        //console.log('route.middleware ='+route.middleware);
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
