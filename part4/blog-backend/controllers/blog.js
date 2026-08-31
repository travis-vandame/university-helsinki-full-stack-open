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

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const deletedBlog = await Blog.findByIdAndDelete(id)

  if(!deletedBlog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  res.status(204).end()
})

module.exports = blogRouter
