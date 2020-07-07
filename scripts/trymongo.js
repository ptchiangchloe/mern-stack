'use strict';
const MongoClient = require('mongodb');

function usage() {
	console.log('Usage:');
	console.log('node', __filename, '<option>');
	console.log('Where option is one of:');
	console.log('  callbacks Use the callbacks paradigm');
	console.log('  promises Use the Promise paradigm');
	console.log('  generator Use the Generator paradigm');
	console.log('  async Use the async module');
}

if(process.argv.length < 3) {
	console.log("Incorrect number of arguments");
	usage();
} else {
	if(process.argv[2] === 'callbacks'){
		testWithCallbacks();
	} else if(process.argv[2] === 'promises') {
		testWithPromises();
	} else if(process.argv[2] === 'generator') {
		testWithGenerator();
	} else if(process.argv[2] === 'async') {
		testWithAsync();
	} else {
		console.log("Invalid option:", process.argv[2]);
		usage();
	}
}

const callbackObj = {
	id:1,
	name: 'A.Callback'
}

const callbackObj2 = {
	id:1,
	name: 'B. Promises'
}

const url = 'mongodb://localhost/playground';

function testWithCallbacks() {
	MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
		if(err) return process.exit(1);
		console.log('Connection is okay');

		const db = client.db('playground');

		db.collection('employees').insertOne(callbackObj, function(err, result) {
			console.log("Result of insert:", result.insertedId);
			db.collection('employees').find({id: 1}).toArray(function(err, docs){
				console.log('Result of find:', docs);
				client.close();
			})
		})
	})
}
// The only remedy if you want to stick to the callback paradigm is to split each small 
// piece of code into its own function and pass the function as a parameter to a call, chaining the callback along.
	
function testWithPromises() {
	let db;
	let cn;
	MongoClient.connect('mongodb://localhost/', {useUnifiedTopology: true}).then(connection => {
		db = connection.db('playground');
		cn = connection;
		return db.collection('employees').insertOne(callbackObj2);
	}).then(result => {
		console.log("Result of insertId:", result.insertedId);
		return db.collection('employees').find({id: 1}).toArray();
	}).then(docs => {
		console.log('Result of find', docs);
		cn.close();
	}).catch(err => {
		console.log('ERROR', err);
	})
}

function testWithGenerator() {
	const co = require('co');
	// co module does the repeated calling, which is why we needed 
	// to wrap the function around co();
	co(function*() {
		const connection = yield MongoClient.connect('mongodb://localhost/', {useUnifiedTopology: true});
		// yield causes a temporary return from the function. 
		const db = connection.db('playground')
		const result = yield db.collection('employees')
		.insertOne({id: 1, name:'C. Generator'});
		console.log('Result of insertedId:', result.insertedId);
		const docs = yield db.collection('employees').find({id: 1}).toArray();
		console.log('Result of find:', docs);
		connection.close();
	}).catch(err => {
		console.log('ERROR', err);
	});
}

function testWithAsync() {
	const async = require('async');
	let db;
	let cn; 
	async.waterfall([
		next => {
			MongoClient.connect('mongodb://localhost/', {useUnifiedTopology: true}, next);
		},
		(connection, next) => {
			cn = connection
			db = connection.db('playground');
			db.collection('employees').insertOne({id: 1, name: 'D. Async'}, next)
		},
		(insertResult, next) => {
			console.log('Result of insertedId:', insertResult.insertedId);
			db.collection('employees').find({id: 1}).toArray(next);
		},
		(docs, next) => {
			console.log('Result of find', docs);
			cn.close();
			next(null, 'All done');
		}
	], (err, result) => {
		console.log('ERROR', err);
	});
}