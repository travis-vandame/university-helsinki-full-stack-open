const Blog = require('../models/blog')

const blogRouter = require('express').Router()

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const { title, author, url } = req.body

  const blog = new Blog({
    title,
    author,
    url
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogRouter
