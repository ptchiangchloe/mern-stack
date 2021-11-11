var express = require('express');
var router = express.Router();
const axios = require('axios');
const Redis = require('redis')

const redisClient = Redis.createClient();

const DEFAULT_EXPIRATION = 3600

// Require controller modules
const brand_controller = require('../controllers/brand');

router.get('/api/brands', brand_controller.brand_list); 

router.get('/api/photos', async (req, res) => {
    const albumId = req.query.albumId
    const redisKey = `photos?albumId=${albumId}`
    const photos = await getOrSetCache(redisKey, async () => {
        // calling out to an api which is always gonna be slow 
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/photos",
            { params: { albumId } }
        )
        return data
    })
    res.json(photos)
})
 
function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if(error) return reject(error)
            if(data != null) return resolve(JSON.parse(data))
            const freshData = await cb()
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(data))
            resolve(freshData)
        })
    })
}

router.get("/api/photos/:id", async (req, res) => {
    const redisKey = `photos:${req.params.id}`
    const photo = await getOrSetCache(redisKey, async () => {
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
        )
        return data
    })

    res.json(photo)
})

module.exports = router;