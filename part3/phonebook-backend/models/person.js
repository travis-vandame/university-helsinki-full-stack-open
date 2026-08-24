const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const conf = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbProtocol: process.env.DB_PROTOCOL,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbAppName: process.env.DB_APP_NAME
}
const dbConn = `${conf.dbProtocol}${conf.dbUser}:${conf.dbPassword}@${conf.dbHost}/${conf.dbName}?retryWrites=true&w=majority&appName=${conf.dbAppName}`

mongoose.connect(dbConn, { family: 4 })
  .then(() => {
    console.log(`MongoDB ${conf.dbName} connected`)
  })
  .catch(error => {
    console.error('Error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Min characters is 3'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'Min characters is 8'],
    validate: {
      validator: function(val) {
        return /^\d{2,3}-\d+$/.test(val)
      },
      message: props => `${props.value} is not a valid number`
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
