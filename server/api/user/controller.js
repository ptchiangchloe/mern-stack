import express from 'express';
const app = express();
import { mongoAltas } from '../../../credential';
import { MongoClient, ObjectId } from 'mongodb';

let db;
const dbUser = mongoAltas.user
const dbPassword = mongoAltas.password
const dbName = mongoAltas.name
const uri = `mongodb://${dbUser}:${dbPassword}@mern-shard-00-00.9djbj.mongodb.net:27017,mern-shard-00-01.9djbj.mongodb.net:27017,mern-shard-00-02.9djbj.mongodb.net:27017/${dbName}?ssl=true&replicaSet=mern-shard-0&authSource=admin&retryWrites=true&w=majority`

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then( client => {
    db = client.db("closet");
    app.listen(3000, () => {
        console.log("App started on port 3000");
    })
})
.catch(err => {
    console.log(err)
  // perform actions on the collection object
  // When we leave the page we should close the client? 
  // client.close();
})

app.get('/api/items', (req, res) => {
    const filter = {};
    db.collection('items').find(filter).toArray().then((items) => {
        const metadata = { total_count: items.length };
        res.json({ _metadata: metadata, records: items });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/items/:id', (req, res) => {
    let issueId;
    try {
        issueId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }

    db.collection('items').find({ _id: issueId }).limit(1)
        .next()
        .then((issue) => {
            if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
            else res.json(issue);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
});