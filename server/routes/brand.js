var express = require('express');
var router = express.Router();

// Require controller modules
const brand_controller = require('../controllers/brand');

router.get('/api/brands', brand_controller.brand_list);

router.post('/api/add_brand', brand_controller.add_brand)

module.exports = router;