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
    const await getOrSetCache(redisKey, () => {
        // calling out to an api which is always gonna be slow 
        const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/photos",
            { params: { albumId } }
        )
        return data
    })
    // wrap everything in the redisClient get 
    redisClient.get(`photos?albumId=${albumId}`, async (error, photos) => {
        if(error) console.log(error)
        if(photos != null) {
            console.log(`Cache Hit`)
            return res.json(JSON.parse(photos))
        } else {
            console.log(`Cache Miss`)
            // calling out to an api which is always gonna be slow 
            const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/photos",
                { params: { albumId } }
            )
            redisClient.setex(`photos?albumId=${albumId}`, DEFAULT_EXPIRATION, JSON.stringify(data))
            res.json(data)
        }
    })
})
 
function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if(error) return reject(error)
            if(data != null) return resolve(JSON.parse(data))
            const freshData = await cb()
            redisClient.setex(`photos?albumId=${albumId}`, DEFAULT_EXPIRATION, JSON.stringify(data))
            resolve(freshData)
        })
    })
}

router.get("/photos/:id", async (req, res) => {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${req.params.id}`,
    )

    res.json(data)
})


module.exports = router;