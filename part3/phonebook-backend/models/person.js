const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const config = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbProtocol: process.env.DB_PROTOCOL,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbAppName: process.env.DB_APP_NAME
}
const dbConn = `${config.dbProtocol}${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority&appName=${config.dbAppName}`

mongoose.connect(dbConn, { family: 4} )
    .then(res => {
        console.log(`MongoDB ${config.dbName} connected`)
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err.message)
    })

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)