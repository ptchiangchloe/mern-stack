var express = require('express');
var router = express.Router();

// Require controller modules
const brand_controller = require('../controllers/brand');

router.get('/api/brands', brand_controller.brand_list);

module.exports = router;