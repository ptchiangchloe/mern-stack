var express = require('express');
var router = express.Router();
const axios = require('axios');

// Require controller modules
const brand_controller = require('../controllers/brand');

router.get('/api/brands', brand_controller.brand_list); 

router.get('/api/photos', async (req, res) => {
    const albumId = req.query.albumId
    // calling out to an api which is always gonna be slow 
    const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        { params: { albumId } }
    )

    res.json(data)
})

router.get("/photos/:id", async (req, res) => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`,
    )

    res.json(data)
})


module.exports = router;