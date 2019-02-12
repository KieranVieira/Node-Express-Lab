const express = require('express');

const db = require('../data/db');

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
    res.send('posts')
});

module.exports = router;