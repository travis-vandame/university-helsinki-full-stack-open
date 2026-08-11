const express = require('express')
const morgan = require('morgan')

const app = express()
const PORT = 3001

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }    
]

app.use(express.json())

morgan.token('req-body-post', (req, res) => {
    return Object.keys(req.body || {}).length ? JSON.stringify(req.body) : '{}'
})

app.use(morgan(':method :url :status :response-time ms - Payload: :req-body-post', {
    skip: (req, res) => req.method !== 'POST'
}))

const generatedId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    
    return String(maxId + 1)
}

app.get('/info', (req, res) => {
    res.status(200).send(`Phonebook has info for ${persons.length} people <br />${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        return res.status(404).json({ error: 'person not found'})
    }

    res.status(200).json(person)
})

app.patch('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        return res.status(404).json({ error: 'person not found'})
    }

    const updatedPerson = {
        ...person,
        name: req.body.name || person.name,
        number: req.body.number || person.number
    }

    persons = persons.map(p => p.id === id ? updatedPerson : p)

    res.status(200).json(updatedPerson)
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(422).json({
            error: 'name and number are missing'
        })
    }

    const hasName = persons.some(person => person.name.toLowerCase() === req.body.name.toLowerCase())

    if (hasName) {
        return res.status(409).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: generatedId(),
        name: req.body.name,
        number: req.body.number
    }

    persons = persons.concat(newPerson)

    res.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const personExists = persons.some(person => person.id === id)

    if (!personExists) {
        return res.status(404).json({ error: 'person not found'})        
    }

    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

