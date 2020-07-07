import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';

// throw new Error('Test!');

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import Issue from './issue';
import config from '../webpack.config';

SourceMapSupport.install();

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

app.use('/static', express.static('public'));

let db;

MongoClient.connect('mongodb://localhost', { useUnifiedTopology: true }).then((connection) => {
    db = connection.db('issuetracker');
    app.listen(3000, () => {
        console.log('App started on port 3000');
    });
}).catch((err) => console.log('ERROR:', err));

if (process.env.NODE_ENV !== 'production') {
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { noInfo: true }));
    app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.get('/api/issues', (req, res) => {
    db.collection('issues').find().toArray().then((issues) => {
        const metadata = { total_count: issues.length };
        res.json({ _metadata: metadata, records: issues });
    })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'New';
    }

    const err = Issue.validateIssue(newIssue);

    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }

    db.collection('issues').insertOne(Issue.cleanupIssue(newIssue))
        .then((result) => db.collection('issues').find({ _id: result.insertedId }).limit(1).next())
        .then((theNewIssue) => {
            res.json(theNewIssue);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
});
