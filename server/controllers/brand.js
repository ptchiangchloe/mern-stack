// import Item model instance. 
const Brand = require('../models/brand');

exports.brand_list = function(req, response) {
    // GET all the brands. 
    Brand.find({}, (err, brandsRawData)=>{
        if (err){
            return res.json({Error: err});
        }
        const res = [];
        for (let i = 0; i < brandsRawData.length; i++) {
            if ('brand-name' in brandsRawData[i]) {
                res.push(brandsRawData[i]['brand-name']);
            }
        }

        response.json({ brands: res })
    })
}