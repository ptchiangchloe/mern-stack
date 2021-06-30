import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

import { mongoAltas } from '../../../credential';
import { MongoClient, ObjectId } from 'mongodb';

let db;
const dbUser = mongoAltas.user
const dbPassword = mongoAltas.password
const dbName = mongoAltas.name
const uri =`mongodb+srv://${dbUser}:${dbPassword}@mern.9djbj.mongodb.net/${dbName}?retryWrites=true&w=majority`
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

import Item from '../../item';

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

app.get('/api/brands', (req, response) => {
    db.collection('brands').find().toArray().then((brandsRawData) => {
        let res = [];
        for(let i=0; i<brandsRawData.length; i++){
            if('brand-name' in brandsRawData[i]) {
                res.push(brandsRawData[i]['brand-name']);
            }
        }

        response.json({brands: res})
    })
    .catch((error) => {
        res.status(500).json({message: `Internal Server Error: ${error}`});
    });
})

app.post('/api/item', (req, res) => {
    const newItem = req.body;
    // newIssue.created = new Date();
    if(!newItem.purchaseDate) {
        newItem.purchaseDate = new Date();
    }

    // we should validate price input in the client-side
    const err = Item.validateItem(newItem);

    if (err) {
        res.status(422).json({ message: `Invalid request/ Unprocessable Entity: ${err}` });
        return;
    }

    console.log(newItem)

    db.collection('items').insertOne(newItem)
    .then((dbRes) => {
        res.status(200).json({message: `new item has been added into the db.`})
    })
    .catch((dbErr) => {
        dbErr.status(500).json({ message: `Internal Server Error: ${error}`});
    })
});

app.post('/api/add-brand-name', (req, res) => {
    console.log(req.body);
    const newBrandName = req.body;

    db.collection('brands').insertOne(newBrandName)
    .then((dbRes) => {
        // console.log(dbRes);
        res.status(200).json({message: `new brand name has been added into the db.`})
    })
    .catch((error) => {
        console.log(error);
        error.status(500).json({ message: `Internal Server Error: ${error}` });
    });
})

app.put('/api/items/:id', (req, res) => {
    let itemId;
    try {
        itemId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({
            message: `Invalid issue ID format: ${error}`,
        });
        return;
    }

    const item = req.body;
    console.log(req)
    // The reason we need to delete the item._id is because performing an update on the 
    // path '_id' would modify the immutable field '_id'
    delete item._id;

    const err = Item.validateItem(item);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }

    db.collection('items').updateOne({ _id: itemId }, {
        $set: item,
    }).then(() => {
        db.collection('items').find({ _id: itemId }).limit(1).next()
            .then((savedItem) => {
                res.json(savedItem);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: `Internal Server Error: ${error}`,
                });
            });
    });
});
