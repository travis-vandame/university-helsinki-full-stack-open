const Blog = require('../models/blog')

const blogRouter = require('express').Router()

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).end()
  }
  res.json(blog)
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

blogRouter.patch('/:id', async (req, res) => {
  const { title, author, url } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url },
    { returnDocument: 'after', runValidators: true }
  )

  if (!updatedBlog) {
    return res.status(404).end()
  }

  res.status(200).json(updatedBlog)
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
