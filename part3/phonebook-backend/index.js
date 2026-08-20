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
    skip: (req, res) => req.method !== 'POST',
    skip: (req, res) => req.method !== 'PATCH',
    // Forces Morgan to use console.log instead of process.stdout
    stream: {
        write: (message) => console.debug(message.trim())
    }
}))

app.get('/info', (req, res) => {
    Person.countDocuments().then(count => {
        const day = new Date()
        res.status(200).send(`Phonebook has info for ${count} people <br/> ${day}`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.status(200).json(people)
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        if (!person) {
            return res.status(404).json({ error: 'person not found' })
        }
        res.status(200).json(person)
    })
})

app.patch('/api/persons/:id', (req, res) => {
    const id = req.params.id

    Person.findByIdAndUpdate(id, req.body, { return: true, runValidators: true})
        .then(updatedPerson => {
            if (!updatedPerson) {
                return res.status(404).json({ error: 'person not found'})
            }
            res.status(200).json(updatedPerson)
        })
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(422).json({
            error: 'person name or number are missing'
        })
    }

    Person.findOne({ name: req.body.name }).then(existing => {
        if (existing) {
            return res.status(409).json({
                error: 'name must be unique'
            })
        }

        const newPerson = Person({
            name: req.body.name,
            number: req.body.number
        })

        newPerson.save().then(savedPerson => {
            res.status(201).json(savedPerson)
        })        
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(deletedPerson => {
            if (!deletedPerson) {
                return res.status(404).json({ error: 'person not found'})
            }
            res.status(204).end()
        })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

