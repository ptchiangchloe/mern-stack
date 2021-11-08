var express = require('express');
var router = express.Router();

// Require controller modules
const brand_controller = require('../controllers/brand');

router.get('/api/cluster', (req, res) => {
    for(let i=0; i<1e8; i++) {
        // some long running task
    }
    res.send(`Ok...${process.pid}`);
})

router.get('/api/brands', brand_controller.brand_list);

module.exports = router;