import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';

import express from 'express';
import bodyParser from 'body-parser';
import { ObjectId } from 'mongodb';
import path from 'path';

// import config from '../webpack.config';
import './api/user/controller';

SourceMapSupport.install();

// An Express application is web server that listens on a specific IP address and port. 
const app = express();


app.use(express.static('static'));
// The argument to the static() function is the directory where the middleware should look for the files. 

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
