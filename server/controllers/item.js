// import Item model instance. 
const Item = require('../models/item');
import { ObjectId } from 'mongodb';

exports.item_list = function(req, res) {
    // GET all the items. 
    Item.find({}, (err, items)=>{
        if (err){
            return res.json({Error: err});
        }
        const metadata = { total_count: items.length };
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
};