const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()

const mongoUrl = `${config.DB_PROTOCOL}${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}?retryWrites=true&w=majority&appName=${config.DB_APP_NAME}`
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
