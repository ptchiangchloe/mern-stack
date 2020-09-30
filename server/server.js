import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import { mongoAltas } from '../credential';

import Item from './item';
// import config from '../webpack.config';
import './api/user/controller';

SourceMapSupport.install();

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

app.use('/static', express.static('public'));

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
