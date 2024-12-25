// import Item model instance. 
const Item = require('../models/item');
import { ObjectId } from 'mongodb';

exports.itemList = function(req, res) {
    // GET all the items. 
    Item.find({}, (err, items)=>{
        if (err){
            return res.json({Error: err});
        }
        const metadata = { total_count: items.length };
        console.log(items[0].purchaseDate)
        res.json({ _metadata: metadata, records: items });
    })
}

exports.item = function(req, res) {
    // GET one item
    let itemId;
    try {
        itemId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid item ID format: ${error}` });
        return;
    }

    Item.find({_id: itemId}, (err, item) => {
        if (err) {
            return res.json({
                Error: err
            })
        }
        res.json(item);
    })
}

exports.add_item = function(req, res) {
    let reqData = req.body;
    if (!reqData.purchaseDate) {
        reqData.purchaseDate = new Date();
    }

    const newItem = new Item({
        brand: reqData.brand,
        category: reqData.category,
        color: reqData.color,
        size: reqData.size,
        purchaseDate:reqData.purchaseDate,
        note: reqData.note
    }) 

    // save this object into database
    newItem.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
}

exports.updateItem = function(req, res) {
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
    console.log(item);

    console.log(item.purchaseDate)

    const decodingPurchaseDate = parseISOString(item.purchaseDate.toString())

    console.log(decodingPurchaseDate)

    // item['purchaseDate'] = formattedPurchaseDate;

    console.log(item)

    const {brand, color, category, size, purchaseDate, note} = item

    Item.updateOne(
        {_id: itemId},
        { brand, color, category, size, purchaseDate: decodingPurchaseDate, note },
        function(err, updateItem) {
            if(err) return res.json({Error: err});
            return res.json(updateItem);
        }
    )
}

function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])).toLocaleDateString('en-US');
}

exports.deleteItem = (req, res) => {
    let itemId;
    try {
        itemId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({
            message: `Invalid request: ${error}`,
        });
        return;
    }
    console.log(itemId);

    Item.deleteOne({ _id: itemId })
        .then((deleteResult) => {
            console.debug(deleteResult);
            if (deleteResult.deletedCount === 1) {
                // Make sure only 1 deletedCount
                res.json({
                    status: 'OK',
                });
            } else {
                res.json({ status: 'Warning: object not found' });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: `Internal Server Error: ${error}`,
            });
        });
}