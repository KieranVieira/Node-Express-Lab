const express = require('express');

const db = require('../data/db');

const router = express.Router()

router.use(express.json())

router.post('/', (req, res) => {
    const postData = req.body;
    try {
        db
        .insert(postData)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
    
});

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

module.exports = router;