require('dotenv').config()

const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.static('dist'))

morgan.token('req-body-post', (req, res) => {
    return Object.keys(req.body || {}).length ? JSON.stringify(req.body) : '{}'
})

app.use(morgan(':method :url :status :response-time ms - Payload: :req-body-post', {
    skip: (req, res) => !['POST', 'PUT', 'PATCH'].includes(req.method),
    // Forces Morgan to use console.log instead of process.stdout
    stream: {
        write: (message) => console.debug(message.trim())
    }
}))

app.get('/info', (req, res, next) => {
    Person.countDocuments()
        .then(count => {
            const day = new Date()
            res.status(200).send(`Phonebook has info for ${count} people <br/> ${day}`)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(people => {
            res.status(200).json(people)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    Person.findById(id)
        .then(person => {
            if (!person) {
                return res.status(404).json({ error: 'person not found' })
            }
            res.status(200).json(person)
        })
})

app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(422).json({
            error: 'person name or number is missing'
        })
    }

    const filter = { name: name }
    const update = { name: name, number: number }
    const options = { 
        upsert: true,
        returnDocument: 'after', 
        setDefaultsOnInsert: true 
    } 

    Person.findOneAndUpdate(filter, update, options)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => next(error))
})

app.patch('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    Person.findByIdAndUpdate(id, req.body, { return: true, returnDocument: 'after', runValidators: true})
        .then(updatedPerson => {
            if (!updatedPerson) {
                return res.status(404).json({ error: 'person not found'})
            }
            res.status(200).json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(deletedPerson => {
            if (!deletedPerson) {
                return res.status(404).json({ error: 'person not found'})
            }
            res.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'mailformatted id'})
    }
    next(error)
}
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

