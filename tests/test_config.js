var sinon = require('sinon'),
    contextPath = process.cwd(), // This is the context path of the application.
    configuration = require(contextPath + '/nodeapp/models/common/configuration'),
    uuid = require('node-uuid'),
    async = require('async'),
    bcrypt = require('bcrypt-nodejs'), 
    expect = require('expect'),
    id = '',
    compref = '',
    role = '',
    priceplan = '',
    oauthclient = '';
GLOBAL.config = {};
var configCtrl = require(contextPath + '/nodeapp/controllers/configCtrl.js');

describe('test_config unit Tests - ', function() {
    var confInput = {},
        staticDataInput = {},
        staticdataids = [],
        res = {},
        next = {};
    beforeEach(function() {
        console.log('Inside beforeEach - test_config');
    });
    afterEach(function() {
        console.log('Inside afterEach - test_config');
    });
    describe('test_config - add env variables - ', function() {
        beforeEach(function() {
            //var support_files_path=process.cwd()+'/nodeapp/support_files';

        }); //end of beforeeach
        afterEach(function() {});
        it('should  add configuration variables in Env', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log('error  =>' + err);
                } else {
                    console.log('output =>' + JSON.stringify(output, null, 4));
                    //expect(output.status).to.equal('success');
                    done();
                }
            };
            configCtrl.addBaseProperties();
            configCtrl.refreshConfig(callback);
        });
    }); //end of create unit Test    
    describe('test_config - create unit Test - ', function() {
        beforeEach(function() {
            confInput = {
                env_ip: '127.0.0.1',
                env_port: '8000',
                key: 'node_app_port',
                value: '8000',
                type: 'single'
            };
        }); //end of beforeeach
        afterEach(function() {});
        it('should provide newly added record', function(done) {
            var callback = function(err, output) {
                console.log('output =>' + JSON.stringify(output, null, 4));
                expect(output.status).to.equal('success');
                if (err) {
                    console.log('error  =>' + err);
                } else {
                    id = output;
                    console.log('id=' + id);
                    done();
                }
            };
            configuration.methods.create(confInput, callback);
        });
    }); //end of create unit Test
    describe.skip('test_config - create Authentication Test - ', function() {
        
        beforeEach(function() {
            var password='backend';
            var bcryptPass = bcrypt.hashSync(password);
            confInput = {
                env_ip: '127.0.0.1',
                env_port: '8000',
                key: 'web_frontend',
                value: bcryptPass,
                type: 'single'
            };
        }); //end of beforeeach
        afterEach(function() {});
        it('should provide newly added Authentication record', function(done) {
            
            var callback = function(err, output) {
                console.log('output =>' + JSON.stringify(output, null, 4));
                //expect(output.status).to.equal('success');
                if (err) {
                    console.log('error  =>' + err);
                } else {
                    id = output;
                    console.log('id=' + id);
                    done();
                }
            };
            configuration.methods.create(confInput, callback);
        });
    }); //end of create unit Test    
    describe.skip('test_config - update unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_config - update ');
            console.log('For update, id =' + id);
            confInput = {
                env_ip: '127.0.0.1',
                env_port: '8000',
                key: 'node_app_ip',
                value: '127.0.0.1',
                type: 'single'
            };
        }); //end of beforeeach
        afterEach(function() {});
        it('should provide updated record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log('error  =>' + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    //expect(output.status).to.equal('success');
                    done();
                }
            };
            configuration.methods.update(id, confInput, callback);
        });
    }); //end of update unit Test
    describe.skip('test_user - getConfigValues  unit Test - ', function() {
        var input = {
            'env_ip': '127.0.0.1',
            'env_port': '8000'
        };
        beforeEach(function() {
            console.log('Inside beforeEach - getConfigValues  ');
        }); //end of beforeeach
        afterEach(function() {});
        it('should get record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log('error  =>' + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    //expect(output.status).to.equal('success'); 
                    console.log("**********************************************************");
                    //console.log('process.env.backend_db_port = ' + process.env.backend_db_port);
                    done();
                }
            };
            configuration.methods.getConfigValues(input, callback);
        });
    }); //end of getById unit Test


});