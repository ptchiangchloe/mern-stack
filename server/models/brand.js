const mongoose = require('mongoose'); // import mongoose

// brand schema

const BrandSchema = new mongoose.Schema({
    'brand-name': 'String'
});

const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand; // export for controller use 