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

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    db 
    .findById(postId)
    .then(post => {
        if(post.length > 0){
            res.status(200).json(post)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved." })
    })  
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    try {
        db.remove(postId)
            .then(post => {
                if(post){
                    res.status(200).json({ message: "Post was removed" })
                }else{
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The post could not be removed" })
    }
});

router.put('/:id', (req, res) => {
    const postUpdate = req.body;
    const postId = req.params.id;
    try {
        db.update(postId, postUpdate)
            .then(post => {
                if(post){
                    res.status(200).json(postUpdate)
                }else{
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            })
    } catch (error) {
        res.status(500).json({ error: "The post information could not be modified." })
    }
});

module.exports = router;