/**
 * This script inserts into mongo the contents of all the .json files in the /seeds directory.
 *
 * The name of the file is the collection that the contents of that file will be inserted into.
 *      Example: This script will insert all the records in cohort.json into the collection "cohort"
 *
 * Usage: $ node seed
 *
 */

var q 					= require('q');
var mongo				= require('mongodb').MongoClient;
// var config              = require('../config.js');
var dir 				= process.cwd()+'/seed';
var app_config          = require(process.cwd() + '/nodeapp/app_config.js');
var fs 					= require('fs'); // Used to get all the files in a directory
var util 				= require('util');
var _ 					= require('underscore');
var errno 			= require('errno');
var path 				= require('path');

/**
 * Reads the .json files from the ./seeds folder and inserts them into mongo
 */
module.exports.seed = function() {

	var listOfFiles = null;

	load_files().then(function(list) {
		listOfFiles = list;
		return getConnection();
	}).then(function(db) {
		return seed_db(db, listOfFiles);
	}).then(function () {
		console.log('----------------------');
		console.log('All done. Go play!');
	}).fail(function(err) {
		console.log(err);
	}).done(function() {
		process.exit();		// TODO: Why is this necessary? Shouldn't the process exit on it's own?
	});
}


/*************************
 * Private
 ************************/


/**
 * Loads all the json files from the ./seeds folder
 */
function load_files() {

	var def = q.defer();

	// Read all the files in the ./seeds folder
	fs.readdir(dir, function(err, files) {

		if(err) {
			def.reject(errmsg(err));
		}

		if(_.isUndefined(files)) {
			def.reject('No /seeds folder exists');
		}

		// Filter out everything except the .json files
		files = files.filter(function(file) {

			// If the file extension is .json
			if(path.extname(file)) {
				return true;
			} else {
				return false;
			}
		});

		def.resolve(files);
	});

	return def.promise;
}


/**
 * Loops through all the .json files in ./seeds and removes all the records
 *
 * @param db		- The mongo object to run queries against
 * @param list	- An array of all the .json files from the seeds folder
 */
function seed_db(db, list) {

	console.log('Seeding files from directory ' + path.resolve(dir));
	console.log('----------------------');

	var operations = [];
	var def = q.defer();

	// Loop through every file in the list
	list.forEach(function (file) {

		// Set the filename without the extension to the variable collection_name
		var collection_name = file.split(".")[0];
		var contents = null;

		// True if the current file has contents, false if it's empty
		var hasContents = fs.statSync(path.resolve(dir + '/' + file)).size > 0;

		console.log('Seeding collection ' + collection_name);

		// If the file has contents, load them
		if(hasContents) {
			contents = require(dir + '/' + file);

			// If the seed file is NOT an array
			if (!util.isArray(contents)) {
				def.reject(new Error('Seed file ' + collection_name + ' does not start with an Array'));
			}
		}
         console.log("code1");
		// The chain of operations to occur for each file. Drop the existing collection if it exists, create it, insert data into it
		 console.log(collection_name);
		var chain = dropCollection(db, collection_name).then(function() {
			console.log("code1.5");
			return createCollection(db, collection_name);
		}).then(function() {
         console.log("code2");
			if(contents) {
				return insert(db, collection_name, contents)
			}
		}).fail(function(err) {
			console.log(err);
		});

		// Push the chain for each file to an array of promises
		operations.push(chain);
	});

	// When all the drop/create/inserts are complete, we're finished
	q.allSettled(operations).then(function() {
		def.resolve();
	}).fail(function(err) {
		console.log(err);
	});

	//Return the deferred promise
	return def.promise;
}


/**
 * Gets a connection to mongo
 *
 * @returns {promise|*|Q.promise}
 */
function getConnection() {

	var def = q.defer();

    mongo.connect('mongodb://' + app_config.db_url , function(err, db) {
		if(err) {
			return def.reject(err);
		}

		def.resolve(db);
	});

	return def.promise;
}


/**
 * Creates a collection in mongo
 *
 * @param collection
 * @returns {*}
 */
function createCollection(db, name) {

	return q.promise(function(resolve, reject, notify) {

		db.createCollection(name, function(err, collection) {

			if(err) {
				return reject(err);
			}

			resolve();
		});
	});
}


/**
 * Drops a collection from mongo if it exists
 *
 * @param collection	- The collection to drop
 * @returns {*}
 */
function dropCollection(db, name) {
    console.log("1");
	return q.promise(function(resolve, reject, notify) {
		console.log("1.5");
		// Check if the collection exists, else don't do anything
		collectionExist(db, name).then(function(exists) {
          console.log("2");
   
			// If the collection exists, drop it
			if(exists) {
				db.dropCollection(name, function(err, reply) {
               console.log("3");
                
					if(err) {
						return reject(err);
					}

					resolve();
				});
			} else {
				resolve();
			}
		});
	console.log("4");	
	});
}


/**
 * Checks if a collection exists
 *
 * @param db		- The db to check if a collection exists in
 * @param name	- The name of the collection we want to see if exists
 * @returns {promise|*|Q.promise}
 */
function collectionExist(db, name) {
      console.log("x");
	return q.promise(function(resolve, reject, notify) {
         console.log("x2");
         console.dir(db);
		db.collectionNames(function(err, collections) {
			console.log("x3");
			if(err) {
				reject(err);
			}
			// If the collection exists in the mongo db
			if(_.findWhere(collections, {name:name})) {
				return resolve(true);
			} else {
				return resolve(false);
			}
		});
	});
}

/**
 * Inserts an array of objects into mongo
 *
 * @param db							- The db to insert into
 * @param collection_name	- The collection to insert into
 * @param contents				- The contents to be inserted
 * @returns {*}
 */
function insert(db, collection_name, contents) {

	return q.promise(function(resolve, reject, notify) {

		db.collection(collection_name).insert(contents, function(err, result) {

			if(err) {
				return reject(err);
			}

			resolve(result);
		});
	});
}


/**
 * Formats error messages to display the actual error message instead of all the errno codes and what not.
 *
 * @param err					- The error object that may or may not contain an errno code
 * @returns {string}	- A simple message
 */
function errmsg(err) {

	var str = 'Error: '
	// if it's a libuv error then get the description from errno
	if (errno.errno[err.errno]) {
		str += errno.errno[err.errno].description
	} else {
		str += err.message
	}

	// if it's a `fs` error then it'll have a 'path' property
	if (err.path) {
		str += ' [' + err.path + ']'
	}
	return str
}