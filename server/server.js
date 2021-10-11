/* eslint-disable max-len */
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';


import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// import config from '../webpack.config';
require('./express-api/routes');
require('./user.js');

const logger = require('./logger');

SourceMapSupport.install();

// An Express application is web server that listens on a specific IP address and port.
const app = express();

// app.use(express.static('static'));
// The argument to the static() function is the directory where  the middleware should look for the files.

app.use(bodyParser.json());

// app.use('/static', express.static('public'));

app.get('*', (req, res) => {
    res.status(404).sendFile(path.resolve('static/index.html'));
});

app.all('*', (req, res) => {
    res.status(404).send('resource not found');
})

// console.log(module);