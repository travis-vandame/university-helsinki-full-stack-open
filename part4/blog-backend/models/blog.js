const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    validate: {
      validator: function(v) {
        try {
          new URL(v)
          return true
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          return false
        }
      },
      message: props => `${props.value} is not a valid URL`
    },
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
