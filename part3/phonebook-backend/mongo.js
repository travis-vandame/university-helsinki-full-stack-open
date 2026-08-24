require('dotenv').config()
const Person = require('./models/person')

if (process.argv.length > 4) {
  console.error('Command takes two arguments as password is set in .ENV')
  console.info('EXAMPLE CMD: node mongo.js name number')
  process.exit(1)
}

const parseArgs = {
  name: process.argv[2],
  number: process.argv[3],
  listAllPeople: process.argv.slice(2).length === 0
}

if (!parseArgs.listAllPeople) {
  const person = new Person({
    name: parseArgs.name,
    number: parseArgs.number
  })
  person.save()
    .then(person => {
      console.log(`added ${person.name} number ${person.number}`)
      process.exit(1)
    })
    .catch(error => {
      console.error('Error saving person:', error.message)
      process.exit(1)
    })
} else {
  Person.find({})
    .then(people => {
      console.log('phonebook:')
      people.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    })
    .catch(error => {
      console.error('Error fetching people:', error.message)
      process.exit(1)
    })
}
