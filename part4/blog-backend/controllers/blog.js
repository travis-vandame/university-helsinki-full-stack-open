const Blog = require('../models/blog')

const blogRouter = require('express').Router()

blogRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.status(200).json(blogs)
    })
    .catch(error => next(error))
})

blogRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogRouter
