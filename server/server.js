import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';

// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';

import Item from './item';
// import config from '../webpack.config';

SourceMapSupport.install();

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

app.use('/static', express.static('public'));

let db;
const uri = "mongodb+srv://<username>:<password>@mern.9djbj.mongodb.net/closet?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  db = client.db("closet");
  app.listen(3000, () => {
      console.log("App started on port 3000");
  })
  console.log(db.databaseName)
  // perform actions on the collection object
  // When we leave the page we should close the client? 
  // client.close();
})

// if (process.env.NODE_ENV !== 'production') {
//     config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
//     config.plugins.push(new webpack.HotModuleReplacementPlugin());

//     const bundler = webpack(config);
//     app.use(webpackDevMiddleware(bundler, { noInfo: true }));
//     app.use(webpackHotMiddleware(bundler, { log: console.log }));
// }

app.get('/api/items', (req, res) => {
    const filter = {};
    console.log(req.query);
    // if (req.query.status) filter.status = req.query.status;
    // if (req.query.effort_lte || req.query.effor_gte) filter.effort = {};
    // if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    // if (req.query.effor_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
    db.collection('items').find(filter).toArray().then((items) => {
        const metadata = { total_count: items.length };
        res.json({ _metadata: metadata, records: items });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.post('/api/item', (req, res) => {
    const newItem = req.body;
    // newIssue.created = new Date();
    if(!newItem.purchaseDate) {
        newItem.purchaseDate = new Date()
    }

    // we should validate price input in the client-side
    const err = Item.validateItem(newItem);

    if (err) {
        res.status(422).json({ message: `Invalid request/ Unprocessable Entity: ${err}` });
        return;
    }

    console.log(newItem)
    db.collection('items').insertOne(Item.cleanupItem(newItem))
    .then((result) => db.collection('items').find({ _id: result.insertedId }).limit(1).next())
    .then((theNewItem) => {
        res.json(theNewItem);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }

    db.collection('issues').find({ _id: issueId }).limit(1)
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

app.put('/api/issues/:id', (req, res) => {
    let issueId;
    console.log(req.params);
    try {
        issueId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({
            message: `Invalid issue ID format: ${error}`,
        });
        return;
    }

    const issue = req.body;
    delete issue._id;

    const err = Issue.validateIssue(issue);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }

    console.log(issue);

    db.collection('issues').updateOne({ _id: issueId }, {
        $set: Issue.convertIssue(issue),
    }).then(() => {
        db.collection('issues').find({ _id: issueId }).limit(1).next()
            .then((savedIssue) => {
            // console.log(savedIssue)
                res.json(savedIssue);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: `Internal Server Error: ${error}`,
                });
            });
    });
});

app.delete('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({
            message: `Invalid request: ${error}`,
        });
        return;
    }

    db.collection('issues').deleteOne({ _id: issueId })
    .then((deleteResult) => {
        if (deleteResult.result.n === 1) {
            res.json({
                status: 'OK',
            });
        } else res.json({ status: 'Warning: object not found' });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: `Internal Server Error: ${error}`,
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
});
