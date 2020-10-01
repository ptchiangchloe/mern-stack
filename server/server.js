import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';

import Item from './item';
// import config from '../webpack.config';
import './api/user/controller';

SourceMapSupport.install();

const app = express();

app.use(express.static('static'));
app.use(bodyParser.json());

app.use('/static', express.static('public'));

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
