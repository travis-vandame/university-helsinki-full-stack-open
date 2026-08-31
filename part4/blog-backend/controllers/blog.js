const Blog = require('../models/blog')

const blogRouter = require('express').Router()

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
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
