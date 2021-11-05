const mongoose = require('mongoose'); // import mongoose

// item schema

const ItemSchema = new mongoose.Schema({
    brand: {type: String, require: true},
    category: String,
    color: String,
    size: String,
    purchaseDate:String,
    note: String
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item; // export for controller use 