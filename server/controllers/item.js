// import Item model instance. 
const Item = require('../models/item');

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