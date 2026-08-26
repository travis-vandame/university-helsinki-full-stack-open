const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')

const app = express()

logger.info(`Connecting to MongoDB ${config.MONGO_DB_URI}`)

mongoose.connect(config.MONGO_DB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error => {
    logger.error('error connecting to MongoDB', error.message)
  }))

app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.readLoggerMorgan)
app.use(middleware.writeLoggerMorgan)

app.use('/api/blogs/', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
