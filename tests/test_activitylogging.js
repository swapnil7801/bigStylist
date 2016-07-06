var sinon = require('sinon'),
    contextPath = process.cwd() // This is the context path of the application.
    ,
    activitylogging = require(contextPath + '/nodeapp/models/common/activityLogging'),
    uuid = require('node-uuid'),
    id = '',
    type = '';
GLOBAL.config = {};
var configCtrl = require(contextPath + '/nodeapp/controllers/configCtrl.js');
//var expect = require('expect');
var id = '',
    compref = '',
    role = '',
    priceplan = '',
    oauthclient = '';
describe('test_activityLogging unit Tests - ', function() {
    var staticDataInput = {},
        res = {},
        next = {}
    beforeEach(function() {
        console.log('Inside beforeEach - test_activityLogging');
    });
    afterEach(function() {
        console.log('Inside afterEach - test_activityLogging');
    });
    describe('test_config - add env variables - ', function() {
        beforeEach(function() {
            //var support_files_path=process.cwd()+'/nodeapp/support_files';

        }); //end of beforeeach
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
    describe('test_activityLogging - create unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_activityLogging - create ');
            var userObj = {
                "userid": "558bd62fbc28c90c1e000005",
                "userData": {
                    "firstname": "swapnil",
                    "lastname": "wankhade",
                    "addressline1": "amt",
                    "addressline2": "nagpur",
                    "suburb": "belpura",
                    "state": "maharashtra",
                    "zipcode": "444601",
                    "email": "abc.@xey.com",
                    "communicationpreference": "5589239cb02d88ac21fa61c9",
                    "role": "5589239cb02d88ac21fa61cb",
                    "registrationdate": "2015-06-23T11:41:32.495Z",
                    "priceplan": "5589239cb02d88ac21fa61ce",
                    "passwordhash": "23423dfwerfwef",
                    "passwordsalt": "test",
                    "lastlogindate": "2015-06-23T11:41:32.495Z",
                    "lastloginipaddress": "127.0.0.1",
                    "logincount": 2,
                    "oauthclient": "5589239cb02d88ac21fa61d0",
                    "oauthtoken": "adsfsdfasdf",
                    "fraudindicator": "fraudind_changed",
                    "fraudmessageid": "messageid_changed"
                }
            };
            var outputPayLoad = {
                "status": "200",
                "msg": "User updated successfully"
            }
            activityLoggingInput = {
                name: 'testingLogs',
                actor: 'userid_' + uuid.v1(),
                origin: '127.0.0.1',
                note: 'retrieving ',
                entityname: 'test',
                entityid: 'test' + uuid.v1(),
                starttime: new Date(),
                endtime: new Date,
                inputpayload: userObj,
                outputpayload: outputPayLoad
            }
        }); //end of beforeeach
        afterEach(function() {});
        it('should provide newly added record', function(done) {
            var callback = function(err, output) {
                console.log('output =>' + JSON.stringify(output));
                if (err) {
                    console.log("error while adding  test " + err);
                } else {
                    // expect(output.status).to.equal('success');
                    id = output;
                    console.log('id=' + id);
                    done();
                }
            };
            activitylogging.methods.createActivityLog(activityLoggingInput, callback);
        });
    }); //end of create unit Test


    describe('test_activityLogging - getById unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_activityLogging - getById ');
            console.log('For getById, id =' + id);
        }); //end of beforeeach
        afterEach(function() {});
        it('should get record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log("error while getById  test " + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    // expect(output.status).to.equal('success');
                    done();
                }
            };
            activitylogging.methods.getById(id, callback);
        });
    }); //end of getById unit Test

    describe('test_activityLogging - getByEntityid unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_activityLogging - getByEntityid ');
            console.log('For getByEntityid, type =' + activityLoggingInput.entityid);
        }); //end of beforeeach
        afterEach(function() {});
        it('should get record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log("error while getById  test " + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    // expect(output.status).to.equal('success');
                    done();
                }
            };
            activitylogging.methods.getByEntityid(activityLoggingInput.entityid, callback);
        });
    }); //end of getByEntityid unit Test

    describe('test_activityLogging - getActivities unit Test - ', function() {
        beforeEach(function() {
            console.log('Inside beforeEach - test_activityLogging - getLastActivities ');
            console.log('For getLastActivity, activityname =' + activityLoggingInput.name);
            console.log('For getLastActivity, actor =' + activityLoggingInput.actor);
            console.log('For getLastActivity, origin =' + activityLoggingInput.origin);

        }); //end of beforeeach
        afterEach(function() {});
        it('should get record', function(done) {
            var callback = function(err, output) {
                if (err) {
                    console.log("error while getById  test " + err);
                } else {
                    console.log('output =>' + JSON.stringify(output));
                    // expect(output.status).to.equal('success');
                    done();
                }
            };
            activitylogging.methods.getActivities(activityLoggingInput.name,
                activityLoggingInput.actor, activityLoggingInput.origin, callback);
        });
    }); //end of getLastActivity unit Test


});