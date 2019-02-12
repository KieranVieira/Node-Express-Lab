const express = require('express');
const postRouter = require('./posts/posts-router')

const server = express()

server.use('/api/posts',postRouter)

server.listen(4000, () => {
    console.log('server is listening on port 4000')
})