var express = require('express');
var router = express.Router();

// Require controller modules
const item_controller = require('../controllers/item');

router.get('/api/items', item_controller.item_list);

router.get('/api/item/:id', item_controller.item);

router.post('/api/item', item_controller.add_item);

module.exports = router;