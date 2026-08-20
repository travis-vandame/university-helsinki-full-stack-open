require('dotenv').config()

const mongoose = require('mongoose')

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

const config = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
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
    name: String,
    number: String
})
const PersonModel = mongoose.model('Person', personSchema)

if (!parseArgs.listAllPeople) {
    const newPerson = new PersonModel({
        name: parseArgs.name,
        number: parseArgs.number
    })
    newPerson.save()
        .then(resPerson => {
            console.log(`added ${resPerson.name} number ${resPerson.number}`)
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
                console.log(`${person.name} ${person.number}`)    
            })
            mongoose.connection.close()
        })
        .catch(error => {
            console.error('Error fetching people:', error.message)
            mongoose.connection.close()
            process.exit(1)
        })
}