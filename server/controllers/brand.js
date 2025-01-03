// import Brand model instance. 
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

exports.add_brand = async function(req, response) {
    // Add a new brand for the brand list 
    console.log(req.body)
    const newBrandName = req.body;

    var newBrand = new Brand(newBrandName)

    // save model to database
    Brand.create(newBrand)
    .then((dbRes) => {
        console.log(dbRes);
        response.status(200).json({
            message: 'new brand name has been added into the db.',
            body: dbRes,
        });
    })
    .catch((error) => {
        console.log(error);
        error.status(500).json({ message: `Internal Server Error: ${error}` });
    });
}
