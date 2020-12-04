db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({created: 1});

