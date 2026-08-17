require('dotenv').config()

const mongoose = require('mongoose')

const parseArgs = {
    person: process.argv[3],
    number: process.argv[4],
    listAllPeople: process.argv.slice(2).length === 1
}

const config = {
    dbUser: process.env.DB_USER,
    dbPassword: process.argv[2],
    dbProtocol: process.env.DB_PROTOCOL,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbAppName: process.env.DB_APP_NAME
}
const dbConn = `${config.dbProtocol}${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority&appName=${config.dbAppName}` 

mongoose.set('strictQuery', false)

mongoose.connect(dbConn, { family: 4})
    .then(() => console.log('Connected to database'))
    .catch(error => {
        console.error('Connection error:', error.message)
        mongoose.connection.close()
    })

const personSchema = new mongoose.Schema({
    person: String,
    number: String
})
const PersonModel = mongoose.model('Person', personSchema)

if (!parseArgs.listAllPeople) {
    const newPerson = new PersonModel({
        person: parseArgs.person,
        number: parseArgs.number
    })
    newPerson.save()
        .then(resPerson => {
            console.log(`added ${resPerson.person} number ${resPerson.number}`)
            mongoose.connection.close()
        })
        .catch(error => {
            console.error('Error saving person:', error.message)
            mongoose.connection.close()
            process.exit(1)
        })
} else {
    PersonModel.find({})
        .then(resPeople => {
            console.log(`phonebook:`)
            resPeople.forEach(person => {
                console.log(`${person.person} ${person.number}`)    
            })
            mongoose.connection.close()
        })
        .catch(error => {
            console.error('Error fetching people:', error.message)
            mongoose.connection.close()
            process.exit(1)
        })
}