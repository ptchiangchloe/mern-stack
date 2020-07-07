db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.insert([
    {
        status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'), 
        effort: 5,
        completeDate: undefined,
        title: 'Error in console when clicking Add'
    },
    {
        status: 'Assigned',
        owner: 'Eddie',
        created: new Date('2016-08-16'),
        effort: 14, 
        completeDate: new Date('2016-08-30'),
        title: 'Missing bottom border on` panel',
    },
]);

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({created: 1});

