import SourceMapSupport from 'source-map-support';

import { mongoAltas } from '../credential';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// import config from '../webpack.config';
// // import mongoose
import mongoose from 'mongoose';

SourceMapSupport.install();

// An Express application is web server that listens on a specific IP address and port.
const app = express();

app.use(bodyParser.json());

let db;
const dbUser = mongoAltas.user;
const dbPassword = mongoAltas.password;
const dbName = mongoAltas.name;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@mern.9djbj.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// establish mongoose connection to database
mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
)

app.listen(4000, () => {
    console.log('App started on port 4000');
});

//Require the Router we defined in item.js
var item = require('./routes/item.js');
//Require the Router we defined in brand.js
var brand = require('./routes/brand.js');

app.use('/', item);
app.use('/', brand);

// app.use(express.static('static'));
// The argument to the static() function is the directory where  the middleware should look for the files.

// app.use('/static', express.static('public'));

app.get('*', (req, res) => {
    res.status(404).sendFile(path.resolve('static/index.html'));
});

app.all('*', (req, res) => {
    res.status(404).send('resource not found');
})