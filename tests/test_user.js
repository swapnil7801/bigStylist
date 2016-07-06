var sinon = require('sinon'),
    contextPath = process.cwd() // This is the context path of the application.
    ,
    user = require(contextPath + '/nodeapp/models/common/user'),
    uuid = require('node-uuid'),
    async = require('async'),
    id = '',
    compref = '',
    role = '',
    priceplan = '',
    oauthclient = '';
GLOBAL.config = {};
var configCtrl = require(contextPath + '/nodeapp/controllers/configCtrl.js');
describe('test_user unit Tests - ', function() {
    var userInput = {},
        staticDataInput = {},
        staticdataids = [],
        res = {},
        next = {},
        email = "swapnil@vast.com";
    beforeEach(function() {
        console.log('Inside beforeEach - test_user');
    });
    afterEach(function() {
        console.log('Inside afterEach - test_user');
    });
    describe('test_config - add env variables - ', function() {
        beforeEach(function() {}); //end of beforeeach
        afterEach(function() {});
        it('should  add configuration variables in Env', function(done) {
            var callback = function(output) {
                console.log('output =>' + JSON.stringify(output, null, 4));
                //expect(output.status).to.equal('success');
                done();
            };
            configCtrl.addBaseProperties();
            configCtrl.refreshConfig(callback);
        });
    }); //end of create unit Test 
    describe('test_user - create unit Test - ', function() {
        beforeEach(function() {
            userInput = {
                name: 'unified',
                email: 'admin@unifiedapp.com',
                password: 'passw0rd',
                dob: new Date(),
                mobileno1: 9594444754,
                mobileno2: '',
                registrationdate: new Date(),
                lastlogindate: new Date(),
                lastloginaddress: '127.0.0.1',
                logincount: 3,
                authclient: "gmail",
                authtoken: "valueaddsofttech",
                activationstatus: true
            };
        }); //end of beforeeach
        afterEach(function() {});
        it('should provide newly added record', function(done) {

            var callback = function(err, output) {
                if (err) {
                    console.log("err while create--" + err);
                } else {
                    console.log('output =>' + JSON.stringify(output, null, 4));
                    //expect(output.status).to.equal('success');
                    id = output;
                    console.log('id=' + id);
                    done();
                }
            };
            user.methods.create(userInput, callback);
        });
    }); //end of create unit Test

    describe.skip('test_user - update unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_user - update ');
            console.log('For update, id =' + id);
            userInput = {
                id: id,
                firstname: 'swapnil',
                lastname: 'wankhade',
                email: 'swapnil@vast.com',
                password: '12346',
                dob: new Date(),
                mobileno1: 8087769337,
                mobileno2: '',
                registrationdate: new Date(),
                lastlogindate: new Date(),
                lastloginaddress: '128.0.0.1',
                logincount: 3,
                authclient: "FB",
                authtoken: "1231243423",
                activationstatus:true
            }
        }); //end of beforeeach
        afterEach(function() {});
        it('should provide updated record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log("error while updating test " + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    //expect(output.status).to.equal('success');
                    done();
                }
            };
            user.methods.update(userInput.id, userInput, callback);
        });
    }); //end of update unit Test

    describe('test_user - getById unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_user - getById ');
            console.log('For getById, id =' + id);
        }); //end of beforeeach
        afterEach(function() {});
        it('should get record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log("error while retrieving test " + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    //expect(output.status).to.equal('success'); 
                    done();
                }
            };
            user.methods.getById(userInput.id, callback);
        });
    }); //end of getById unit Test

    describe('test_user - getByEmail unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_user - getById ');
            console.log('For getByEmail, email = admin@unifiedapp.com');
        }); //end of beforeeach
        afterEach(function() {});
        it('should get record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log("error while retrieving test " + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    //expect(output.status).to.equal('success'); 
                    done();
                }
            };
            user.methods.getByEmail(email, callback);
        });
    }); //end of getById unit Test
    describe.skip('test_user - delete unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_user - delete ');
            console.log('For delete, id =' + userInput.id);
        }); //end of beforeeach
        afterEach(function() {})
        it('should delete record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log("err while delete test--" + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    //expect(output.status).to.equal('success'); 
                    done();
                }
            };
            user.methods.delete(userInput.id, callback);
        });
    }); //end of delete unit Test


});