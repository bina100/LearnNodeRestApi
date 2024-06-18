const { validationResult } = require('express-validator')

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: '1',
                title: 'First Post',
                content: 'this is first post',
                imageUrl: 'images/duck.jpg',
                creator: {
                    name: 'Bina'
                },
                createdAt: new Date()
            }]
    })
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('validation failed, entered data is incorrect.')
        error.statusCode = 422
        throw error
        // return res.status(422).json({message: 'validation failed, entered data is incorrect.', errors: errors.array()})
    }
    const title = req.body.title
    const content = req.body.content
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/duck.jpg',
        creator: { name: 'Bina' }
    })
    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: result
            })
        })
        .catch(err => {
            if (err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getPost = (req, res, next)=>{
    const postId = req.params.postId
    Post.findById(postId)
    .then(post=>{
        if(!post){
            const error = new Error('Could not find post.')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({message: 'Post fetched.', post:post})
    })
    .catch(err => {
        if (err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}
