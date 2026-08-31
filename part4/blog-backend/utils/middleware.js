const logger = require('./logger')
const morgan = require('morgan')

morgan.token('req-body-post', (req) => {
  return Object.keys(req.body || {}).length ? JSON.stringify(req.body) : '{}'
})

const readLoggerMorgan = morgan('dev', {
  skip: (req) => ['POST', 'PUT', 'PATCH'].includes(req.method),
  // Direct stream to console.log instead of process.stdout
  stream: {
    write: (message) => logger.info(message.trim())
  }
})

const writeLoggerMorgan = morgan(
  ':method :url :status :response-time ms - Payload: :req-body-post',
  {
    skip: (req) => !['POST', 'PUT', 'PATCH'].includes(req.method)
  }
)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else {
    // return res.status(400).json({ error: 'unknown error' })
  }

  next(error)
}

module.exports = {
  readLoggerMorgan,
  writeLoggerMorgan,
  unknownEndpoint,
  errorHandler
}
